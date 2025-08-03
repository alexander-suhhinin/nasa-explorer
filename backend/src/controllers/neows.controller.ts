

import { fetchNeoWs } from '../services/nasa.service';
import cache from '../utils/cache';

interface NeoWsQuery {
  start_date?: string;
  end_date?: string;
}

export async function getNeoWs(query: NeoWsQuery) {
  const { start_date, end_date } = query;

  // Build cache key based on date range
  const cacheKey = `neows_${start_date || 'default'}_${end_date || 'today'}`;
  const CACHE_TTL = 60 * 5; // 5 minutes

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch from NASA API via service
  const queryParams: NeoWsQuery = {};
  if (start_date !== undefined) queryParams.start_date = start_date;
  if (end_date !== undefined) queryParams.end_date = end_date;

  const data = await fetchNeoWs(queryParams);

  // Cache the result
  cache.set(cacheKey, data, CACHE_TTL);

  return data;
}