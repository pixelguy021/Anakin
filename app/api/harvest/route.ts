// app/api/harvest/route.ts
import { HARVEST_FEED } from "@/lib/harvest-stream";
import { LOCALE_CORPUS } from "@/lib/locale-data";

export async function GET() {
  return Response.json({
    feed: HARVEST_FEED,
    stats: {
      totalSites: LOCALE_CORPUS.reduce((sum, l) => sum + l.sources.length, 0),
      activeSites: LOCALE_CORPUS.reduce((sum, l) => sum + l.sources.filter(s => s.status === "active").length, 0),
      totalPhrases: LOCALE_CORPUS.reduce((sum, l) => sum + l.harvested, 0),
      todayPhrases: HARVEST_FEED.filter(h => h.status === "done").reduce((sum, h) => sum + h.phrasesFound, 0),
      avgQuality: Math.round(HARVEST_FEED.filter(h => h.quality > 0).reduce((sum, h) => sum + h.quality, 0) / HARVEST_FEED.filter(h => h.quality > 0).length),
    }
  });
}
