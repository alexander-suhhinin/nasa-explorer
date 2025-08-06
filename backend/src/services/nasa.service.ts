import axios from 'axios';
import { createCache } from '../cache/CacheFactory';
import config from '../config';

interface MarsQuery {
  sol?: number;
  earth_date?: string;
  camera?: string;
}

interface NeoWsQuery {
  start_date?: string;
  end_date?: string;
}

const cache = createCache();


async function fetchData(url: string, additionalParams?: Record<string, any>) {
  const params = { api_key: config.nasaApiKey, ...additionalParams };
  return axios.get(url, { params });
}
/**
 * Fetches Astronomy Picture of the Day from NASA API with caching
 */
export async function fetchApod() {
  const cacheKey = 'apod_data';
  const cached = await cache.get<any>(cacheKey);
  if (cached) return cached;

  const { data } = await fetchData(config.nasaApodUrl)

  const result = {
    date: data.date,
    title: data.title,
    url: data.url,
    explanation: data.explanation,
    media_type: data.media_type,
  };

  await cache.set(cacheKey, result, config.defaultTtl);
  return result;
}

/**
 * Fetches Mars Rover photos from NASA API with caching
 */
export async function fetchMarsPhotos(query: MarsQuery) {
  const { sol, earth_date, camera } = query;

  const params: Record<string, string | number> = {};

  if (sol !== undefined) params['sol'] = sol;
  if (earth_date !== undefined) params['earth_date'] = earth_date;
  if (camera !== undefined) params['camera'] = camera;

  const cacheKey = `mars_${sol || earth_date || 'latest'}_${camera || 'all'}`;
  const cached = await cache.get<any[]>(cacheKey);
  if (cached) return cached;

  const { data } = await fetchData(config.nasaMarsUrl, params)
  const result = data.photos.map((photo: any) => ({
    id: photo.id,
    sol: photo.sol,
    img_src: photo.img_src,
    earth_date: photo.earth_date,
    camera: photo.camera.full_name,
    rover: photo.rover.name,
  }));

  await cache.set(cacheKey, result, config.defaultTtl);
  return result;
}

/**
 * Fetches Near-Earth Objects (NeoWs) data from NASA API with caching
 */
export async function fetchNeoWs(query: NeoWsQuery) {
  const { start_date, end_date } = query;

  const params: Record<string, string> = {};

  if (start_date) params['start_date'] = start_date;
  if (end_date) params['end_date'] = end_date;

  const cacheKey = `neows_${start_date || 'default'}_${end_date || 'today'}`;
  const cached = await cache.get<any[]>(cacheKey);
  if (cached) return cached;

  const { data } = await fetchData(config.nasaNeoWsUrl, params)

  const nearEarthObjects = data.near_earth_objects;
  const simplified: any[] = [];

  Object.keys(nearEarthObjects).forEach((date) => {
    const objects = nearEarthObjects[date];
    objects.forEach((obj: any) => {
      simplified.push({
        id: obj.id,
        name: obj.name,
        nasa_jpl_url: obj.nasa_jpl_url,
        absolute_magnitude_h: obj.absolute_magnitude_h,
        is_potentially_hazardous_asteroid: obj.is_potentially_hazardous_asteroid,
        estimated_diameter_m: obj.estimated_diameter.meters.estimated_diameter_max,
        close_approach_date: obj.close_approach_data[0]?.close_approach_date,
        relative_velocity_kph: obj.close_approach_data[0]?.relative_velocity?.kilometers_per_hour,
        miss_distance_km: obj.close_approach_data[0]?.miss_distance?.kilometers,
      });
    });
  });

  await cache.set(cacheKey, simplified, config.defaultTtl);
  return simplified;
}