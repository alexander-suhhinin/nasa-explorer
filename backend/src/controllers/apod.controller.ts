import { fetchApod } from '../services/nasa.service';
import cache from '../utils/cache';

const APOD_CACHE_KEY = 'apod_data';
const CACHE_TTL = 60 * 5; // 5 minutes

/**
 * Controller to get Astronomy Picture of the Day
 */
export async function getApod() {
  // Check cache first
  const cached = cache.get(APOD_CACHE_KEY);
  if (cached) {
    return cached;
  }

  // Fetch from NASA API
  const data = await fetchApod();

  // Cache result
  cache.set(APOD_CACHE_KEY, data, CACHE_TTL);

  return data;
}
