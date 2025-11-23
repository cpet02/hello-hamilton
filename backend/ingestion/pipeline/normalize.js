/**
 * NORMALIZE
 * ----------
 * Takes a raw event (from a scraper/extractor) and ensures:
 * - required fields exist
 * - types are correct
 * - missing fields are defaulted
 * - weird scraped values are cleaned
 * - ensures the Unified Ingestion Format is followed
 */

export function normalizeEvent(raw) {
  // TODO: expand real normalization later
  return {
    source: raw.source || "unknown",

    title: raw.title?.trim() || "Untitled Event",
    description: raw.description || null,

    location: raw.location || null,

    category: raw.category || null,
    cost: raw.cost || null,
    indoor: raw.indoor ?? null,
    energy: raw.energy || null,
    seasonal: raw.seasonal || null,

    groupSize: Array.isArray(raw.groupSize) ? raw.groupSize : [],

    extra: {
      ...raw.extra,
      scrapedAt: raw.extra?.scrapedAt || new Date().toISOString()
    },

    freshness: {
    scrapedAt: raw.extra?.scrapedAt || new Date().toISOString(),
    expiresAt: raw.extra?.expiresAt || null
    }       

  };
}

