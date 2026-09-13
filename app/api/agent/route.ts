// app/api/agent/route.ts
// Local model agent — powered by Ollama via OpenAI-compatible endpoint
// Web scraping powered by Anakin.io URL Scraper API (Zero Touch / API key)

import { createOpenAI } from "@ai-sdk/openai";
import { generateText, isStepCount } from "ai";
import { tool, zodSchema } from "@ai-sdk/provider-utils";
import { z } from "zod";
import { LOCALE_CORPUS, TOTAL_STATS } from "@/lib/locale-data";
import { HARVEST_FEED } from "@/lib/harvest-stream";

export const maxDuration = 120;

// Use the local Ollama instance via its OpenAI-compatible endpoint — no API key needed
const ollamaClient = createOpenAI({ baseURL: "http://localhost:11434/v1", apiKey: "none" });
const MODEL = "clarion-qwen:latest";

const ANAKIN_API_KEY = process.env.ANAKIN_API_KEY || "";
const ANAKIN_SCRAPER_URL = "https://api.anakin.io/v1/url-scraper/scrape";

const SYSTEM_PROMPT = `You are Anakin, an AI agent for multilingual locale grounding.

Your mission: Surface authentic in-market phrasing across 242 languages. NOT model-generated translationese — real harvested text from regional marketplaces, country TLDs, and social platforms.

You address UC-2 of the language_expansion platform: the "localize" mode needs genuine country-language wording. Anakin sources authentic phrasing from the real web using the Anakin.io scraping API.

You have these tools:
1. look_up_locale(langCode, domain) — returns authentic phrases for a locale
2. compare_phrases(concept, locales) — compares authentic vs. translated text side by side
3. list_sources(langCode) — lists active harvest sources for a locale
4. harvest_status() — returns global corpus statistics
5. recommend_sources(region) — best regional sources by phrase yield
6. scrape_url(url) — scrapes any live website URL using Anakin.io and returns clean Markdown content

When a user asks to browse a website, scrape a URL, or get live content from a page, always use scrape_url.
Always call a tool first, then summarize the results. Be direct. Show scores and data.`;

// ── Tool execute functions ──────────────────────────────────────────────────

const lookupLocaleSchema = z.object({
  langCode: z.string().describe("ISO language code e.g. 'id', 'ja', 'ko', 'th'"),
  domain: z.enum(["ecommerce", "support", "ui", "review", "social", "all"]),
});

const comparePhrasesSchema = z.object({
  concept: z.string().describe("Phrase key e.g. 'add_to_cart', 'flash_sale', 'free_shipping'"),
  locales: z.array(z.string()).describe("Lang codes to compare e.g. ['id','th','vi']"),
});

const listSourcesSchema = z.object({
  langCode: z.string().describe("ISO language code"),
});

const harvestStatusSchema = z.object({});

const recommendSourcesSchema = z.object({
  region: z.enum(["SEA", "EA", "SA", "EU", "MENA", "AF", "LATAM", "NA", "all"]),
});

async function executeLookupLocale({ langCode, domain }: z.infer<typeof lookupLocaleSchema>) {
  const locale = LOCALE_CORPUS.find(
    (l) => l.langCode === langCode || l.id.startsWith(langCode)
  );
  if (!locale) {
    const available = LOCALE_CORPUS.map((l) => `${l.langCode}(${l.country})`).join(", ");
    return { error: `Locale '${langCode}' not found. Try: ${available}` };
  }
  const phrases = domain === "all"
    ? locale.phrases
    : locale.phrases.filter((p) => p.domain === domain);
  return {
    locale: locale.lang,
    country: locale.country,
    coverage: locale.coverage,
    quality: locale.quality,
    harvested: locale.harvested,
    phrases: phrases.map((p) => ({
      key: p.key,
      authentic: p.authentic,
      translated: p.translated,
      source: p.source,
      score: p.authenticityScore,
    })),
  };
}

async function executeComparePhrases({ concept, locales }: z.infer<typeof comparePhrasesSchema>) {
  const results = [];
  for (const langCode of locales) {
    const locale = LOCALE_CORPUS.find(
      (l) => l.langCode === langCode || l.id.startsWith(langCode)
    );
    if (!locale) continue;
    const phrase = locale.phrases.find(
      (p) => p.key === concept || p.key.includes(concept.toLowerCase().replace(/ /g, "_"))
    );
    if (phrase) {
      results.push({
        language: locale.lang,
        country: locale.country,
        authentic: phrase.authentic,
        translated: phrase.translated,
        score: phrase.authenticityScore,
        divergence: phrase.authentic.toLowerCase() !== phrase.translated.toLowerCase() ? "HIGH" : "NONE",
        source: phrase.source,
      });
    }
  }
  return { concept, results, count: results.length };
}

async function executeListSources({ langCode }: z.infer<typeof listSourcesSchema>) {
  const locale = LOCALE_CORPUS.find(
    (l) => l.langCode === langCode || l.id.startsWith(langCode)
  );
  if (!locale) return { error: `Locale '${langCode}' not found` };
  return {
    locale: locale.lang,
    country: locale.country,
    sources: locale.sources,
    total: locale.sources.reduce((s, x) => s + x.phrasesFound, 0),
  };
}

async function executeHarvestStatus() {
  return {
    totalLanguages: TOTAL_STATS.languages,
    seeded: TOTAL_STATS.seeded,
    totalPhrases: TOTAL_STATS.totalPhrases,
    avgQuality: TOTAL_STATS.avgQuality,
    avgCoverage: TOTAL_STATS.avgCoverage,
    recent: HARVEST_FEED.filter((h) => h.status === "done").slice(0, 6).map((h) => ({
      site: h.siteName,
      lang: h.lang,
      phrases: h.phrasesFound,
      quality: h.quality,
    })),
    top: [...LOCALE_CORPUS]
      .sort((a, b) => b.coverage - a.coverage)
      .slice(0, 5)
      .map((l) => ({ locale: `${l.lang} (${l.country})`, coverage: l.coverage, phrases: l.harvested })),
  };
}

async function executeRecommendSources({ region }: z.infer<typeof recommendSourcesSchema>) {
  const locales = region === "all" ? LOCALE_CORPUS : LOCALE_CORPUS.filter((l) => l.region === region);
  const sources = locales
    .flatMap((l) => l.sources.map((s) => ({ ...s, locale: l.lang, country: l.country })))
    .sort((a, b) => b.phrasesFound - a.phrasesFound)
    .slice(0, 8);
  return { region, sources, tip: `Top yield: ${sources[0]?.name || "N/A"} with ${sources[0]?.phrasesFound || 0} phrases` };
}

const scrapeUrlSchema = z.object({
  url: z.string().url().describe("Full URL to scrape, e.g. 'https://www.tokopedia.com'"),
});

async function executeScrapeUrl({ url }: z.infer<typeof scrapeUrlSchema>) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (ANAKIN_API_KEY) {
      headers["X-API-Key"] = ANAKIN_API_KEY;
    }
    const res = await fetch(ANAKIN_SCRAPER_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ url, format: "markdown" }),
    });
    if (res.status === 402) {
      return {
        error: "Zero Touch free allowance exhausted.",
        hint: "Set ANAKIN_API_KEY in .env.local to get full access. Sign up free at https://anakin.io",
      };
    }
    if (!res.ok) {
      const text = await res.text();
      return { error: `Anakin API error ${res.status}`, details: text };
    }
    const data = await res.json();
    const markdown: string = data.markdown || data.content || "";
    const creditsRemaining = res.headers.get("X-Trial-Credits-Remaining");
    return {
      url,
      markdown: markdown.slice(0, 6000), // cap to avoid context overflow
      chars: markdown.length,
      creditsRemaining: creditsRemaining ? parseInt(creditsRemaining, 10) : null,
      powered_by: "Anakin.io URL Scraper",
    };
  } catch (err) {
    return { error: `Network error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ── Route handler ───────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = ollamaClient(MODEL);

  const result = await generateText({
    model,
    system: SYSTEM_PROMPT,
    messages,
    stopWhen: isStepCount(5),
    tools: {
      look_up_locale: tool({
        description: "Look up authentic in-market phrases for a country-language pair",
        inputSchema: zodSchema(lookupLocaleSchema),
        execute: executeLookupLocale,
      }),
      compare_phrases: tool({
        description: "Compare authentic phrasing vs model-translated text for a concept across locales",
        inputSchema: zodSchema(comparePhrasesSchema),
        execute: executeComparePhrases,
      }),
      list_sources: tool({
        description: "List active web harvest sources for a locale",
        inputSchema: zodSchema(listSourcesSchema),
        execute: executeListSources,
      }),
      harvest_status: tool({
        description: "Get global corpus harvest statistics",
        inputSchema: zodSchema(harvestStatusSchema),
        execute: executeHarvestStatus,
      }),
      recommend_sources: tool({
        description: "Recommend highest-yield web sources for a region",
        inputSchema: zodSchema(recommendSourcesSchema),
        execute: executeRecommendSources,
      }),
      scrape_url: tool({
        description: "Scrape any live URL using Anakin.io and return clean Markdown content. Use this when the user asks to browse, fetch, or read a specific website.",
        inputSchema: zodSchema(scrapeUrlSchema),
        execute: executeScrapeUrl,
      }),
    },
  });

  const toolCalls = result.steps?.flatMap((step) => {
    const calls = (step.toolCalls as Array<Record<string, unknown>>) || [];
    const results = (step.toolResults as Array<Record<string, unknown>>) || [];
    return calls.map((tc, i) => ({
      toolName: String(tc.toolName || ""),
      args: tc.input || tc.args || {},
      result: results[i] ? results[i].output ?? results[i].result : undefined,
    }));
  }) || [];

  return Response.json({
    text: result.text,
    toolCalls,
    finishReason: result.finishReason,
  });
}
