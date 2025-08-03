import axios, { AxiosRequestConfig } from 'axios';
import cache from './cache';

/**
 * Fetch data from an API with retry, timeout, and optional caching.
 *
 * @param url The API endpoint
 * @param params Query parameters
 * @param cacheKey Unique cache key
 * @param ttl Cache TTL in seconds (default 300)
 * @param retries Number of retry attempts (default 3)
 * @param timeout Request timeout in ms (default 5000)
 */
export async function fetchWithRetryAndCache<T>(
  url: string,
  params: Record<string, any>,
  cacheKey: string,
  ttl = 300,
  retries = 3,
  timeout = 5000
): Promise<T> {
  // 1. Check cache first
  const cached = cache.get(cacheKey) as T | undefined;
  if (cached) {
    return cached;
  }

  // 2. Create axios instance with timeout
  const api = axios.create({ timeout });

  // 3. Retry loop with exponential backoff
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const config: AxiosRequestConfig = { params };
      const response = await api.get<T>(url, config);

      // Cache the successful result
      cache.set(cacheKey, response.data, ttl);

      return response.data;
    } catch (error) {
      if (attempt === retries) {
        // Last attempt failed: fallback to cache if any old data exists
        const fallback = cache.get(cacheKey) as T | undefined;
        if (fallback) {
          console.warn(`[fetchWithRetry] Returning cached fallback for ${url}`);
          return fallback;
        }
        console.error(`[fetchWithRetry] All retries failed for ${url}`);
        throw error;
      }
      // Exponential backoff: 500ms * attempt
      await new Promise((res) => setTimeout(res, 500 * attempt));
    }
  }

  throw new Error(`Unexpected fetchWithRetry error for ${url}`);
}
