/**
 * NORMALIZE
 * ----------
 * Converts raw scraped event data into the unified format used
 * by Prisma. Adds inferred category, parsed dates, indoor/outdoor guesses,
 * cleans text, extracts missing coords, etc.
 */

// --- Helpers ---
function parseDateRange(dateText) {
  if (!dateText) return { startDate: null, endDate: null };

  // Example formats:
  // "January 1, 2025 to December 31 2025"
  // "November 26, 2025"
  const parts = dateText.split(" to ");

  const start = new Date(parts[0].trim());
  const end = parts[1] ? new Date(parts[1].trim()) : null;

  return {
    startDate: isNaN(start) ? null : start.toISOString(),
    endDate: end && !isNaN(end) ? end.toISOString() : null
  };
}

function inferCategory(title, description) {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("market")) return "market";
  if (text.includes("christmas") || text.includes("holiday")) return "holiday";
  if (text.includes("museum") || text.includes("exhibit")) return "culture";
  if (text.includes("broadway") || text.includes("musical")) return "arts";
  if (text.includes("garden") || text.includes("rbg")) return "nature";
  if (text.includes("performance") || text.includes("concert"))
    return "arts";

  return null;
}

function inferIndoor(raw) {
  const t = `${raw.title} ${raw.description} ${raw.extra?.url}`.toLowerCase();

  if (
    t.includes("theatre") ||
    t.includes("museum") ||
    t.includes("aquarius") ||
    t.includes("centre") ||
    t.includes("center")
  ) {
    return true;
  }

  if (
    t.includes("garden") ||
    t.includes("park") ||
    t.includes("botanical") ||
    t.includes("trail")
  ) {
    return false;
  }

  return null;
}

function cleanDescription(desc) {
  if (!desc) return null;
  return desc
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ")
    .trim();
}

function extractCoordsFromMapUrl(mapUrl) {
  if (!mapUrl) return null;
  const match = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!match) return null;

  return {
    lat: parseFloat(match[1]),
    lng: parseFloat(match[2])
  };
}

// --- MAIN NORMALIZER ---
export function normalizeEvent(raw) {
  // 6.2.1 – Dates
  const { startDate, endDate } = parseDateRange(raw.extra?.date);

  // 6.2.2 – Category inference
  const category = raw.category || inferCategory(raw.title, raw.description);

  // 6.2.3 – Indoor/outdoor
  const indoor = raw.indoor ?? inferIndoor(raw);

  // 6.2.4 – Location fallback
  const location =
    raw.location ||
    extractCoordsFromMapUrl(raw.extra?.mapUrl) ||
    null;

  // 6.2.5 – Clean description
  const description = cleanDescription(raw.description);

  // 6.2.6 – group size default
  const groupSize = Array.isArray(raw.groupSize) ? raw.groupSize : [];

  // 6.2.7 – Build final normalized object
  const normalized = {
    source: raw.source || "unknown",

    title: raw.title?.trim() || "Untitled Event",
    description,

    location,

    category,
    cost: raw.cost || null,
    indoor,
    energy: raw.energy || null,
    seasonal: raw.seasonal || null,

    // New — parsed event dates
    startDate,
    endDate,

    groupSize,

    extra: {
      ...raw.extra,
      scrapedAt: raw.extra?.scrapedAt || new Date().toISOString()
    },

    freshness: {
      scrapedAt: raw.extra?.scrapedAt || new Date().toISOString(),
      expiresAt: raw.extra?.expiresAt || null
    }
  };

  return normalized;
}