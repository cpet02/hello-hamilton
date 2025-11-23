/**
 * INGEST
 * ------
 * Main entry point for ingestion.
 * Takes an array of raw events:
 *
 *    ingestEvents([raw1, raw2, raw3])
 *
 * For each event:
 *   - normalize
 *   - dedupe
 *   - upsert (create or update)
 */

import { PrismaClient } from "@prisma/client";
import { normalizeEvent } from "./normalize.js";
import { findExistingEvent } from "./dedupe.js";

const prisma = new PrismaClient();

// TODO (Day 7–9):
// - Check if normalized.freshness.expiresAt is in the past
//   If yes → mark event stale / soft-delete / ignore
// - Check if existing event has more recent scrapedAt
//   Avoid overwriting newer data with older scraped data
// - Add scoring rules for freshness / trust level per extractor

export async function ingestEvents(rawEvents) {
  const results = [];

  for (const raw of rawEvents) {
    const normalized = normalizeEvent(raw);
    const existing = await findExistingEvent(normalized);

    if (existing) {
      // placeholder update behavior (will be improved later)
      const updated = await prisma.event.update({
        where: { id: existing.id },
        data: {
          ...normalized,
          updatedAt: new Date()
        }
      });

      results.push({ action: "updated", event: updated });
    } else {
      // create new event
      const created = await prisma.event.create({
        data: normalized
      });

      results.push({ action: "created", event: created });
    }
  }

  return results;
}