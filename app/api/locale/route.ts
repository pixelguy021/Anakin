// app/api/locale/route.ts
import { LOCALE_CORPUS, TOTAL_STATS, REGION_STATS } from "@/lib/locale-data";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const region = searchParams.get("region");

  if (id) {
    const locale = LOCALE_CORPUS.find(l => l.id === id);
    if (!locale) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(locale);
  }

  if (region) {
    const locales = LOCALE_CORPUS.filter(l => l.region === region);
    return Response.json({ locales });
  }

  return Response.json({
    locales: LOCALE_CORPUS,
    total: TOTAL_STATS,
    regions: REGION_STATS,
  });
}
