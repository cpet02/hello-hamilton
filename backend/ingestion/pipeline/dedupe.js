/**
 * DEDUPE
 * ------
 * Checks if the normalized event matches an existing DB event.
 * For now, this is just scaffolding.
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// TODO (Day 8):
// - Improve dedupe: fuzzy title matching
// - Consider events with similar coords (< 50m radius)
// - Add date-based dedupe for recurring events

// simple placeholder matching: by title + lat/lng
export async function findExistingEvent(normalized) {
  if (!normalized.location) return null;

  const { lat, lng } = normalized.location;

  const existing = await prisma.event.findFirst({
    where: {
      title: normalized.title,
      location: {
        equals: { lat, lng }
      }
    }
  });

  return existing;
}