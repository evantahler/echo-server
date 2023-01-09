import { cache, config } from "actionhero";

const CACHE_KEY = "log";
const CACHE_LIMIT = config.cache.cache_size;

export type Payload = {
  timestamp: number;
  payload: string;
};

export async function cacheAppend(message = "") {
  await cacheTrim();

  const payload: Payload = {
    timestamp: Date.now(),
    payload: message,
  };

  await cache.push(CACHE_KEY, payload);
}

/**
 *
 * @param start (default 0)
 * @param size (default -1), which means "all"
 * @returns Payload[]
 */
export async function loadCache(start = 0, size = -1) {
  const key = cache.redisPrefix + CACHE_KEY;
  const payloads = await cache
    .client()
    .lrange(key, start, size)
    .then((strings) => strings.map((s) => JSON.parse(s).data as Payload));

  return payloads.reverse();
}

export async function cacheTrim(limit = CACHE_LIMIT) {
  const key = cache.redisPrefix + CACHE_KEY;
  let length = await cache.client().llen(key);
  let count = 0;

  while (length > limit - 1 && length > 0) {
    await cache.client().lpop(key);
    count++;
    length = await cache.client().llen(key);
  }

  return count;
}
