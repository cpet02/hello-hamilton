// Placeholder caching layer for expensive scrapers.
// Later we will add:
// - memory cache
// - Redis cache (optional)
// - staleness checks
// - cache invalidation

const cache = new Map();

export function getCached(key) {
  return cache.get(key) || null;
}

export function setCached(key, value) {
  cache.set(key, {
    value,
    cachedAt: Date.now()
  });
}
