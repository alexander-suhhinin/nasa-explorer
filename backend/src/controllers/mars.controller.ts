

import { fetchMarsPhotos } from '../services/nasa.service';
import cache from '../utils/cache';

interface MarsQuery {
  sol?: number;
  earth_date?: string;
  camera?: string;
}

export async function getMarsPhotos(query: MarsQuery) {
  const { sol, earth_date, camera } = query;

  // Build cache key based on parameters
  const cacheKey = `mars_${sol || earth_date || 'latest'}_${camera || 'all'}`;
  const CACHE_TTL = 60 * 5; // 5 minutes

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch from NASA API via service
  const queryParams: MarsQuery = {};
  if (sol !== undefined) queryParams.sol = sol;
  if (earth_date !== undefined) queryParams.earth_date = earth_date;
  if (camera !== undefined) queryParams.camera = camera;

  const data = await fetchMarsPhotos(queryParams);

  // Cache the result
  cache.set(cacheKey, data, CACHE_TTL);

  return data;
}