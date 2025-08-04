import axios from 'axios';
import { fetchWithRetryAndCache } from '../utils/fetchWithRetry';

const NASA_API_KEY = process.env['NASA_API_KEY'] || 'DEMO_KEY';

const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';
const NASA_MARS_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const NASA_NEOWS_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

interface MarsQuery {
  sol?: number;
  earth_date?: string;
  camera?: string;
}

interface NeoWsQuery {
  start_date?: string;
  end_date?: string;
}

/**
 * Fetches Astronomy Picture of the Day from NASA API with caching and retry
 */
export async function fetchApod() {
  const cacheKey = 'apod_data';
  const params = { api_key: NASA_API_KEY };

  const data = await fetchWithRetryAndCache<any>(NASA_APOD_URL, params, cacheKey);

  return {
    date: data.date,
    title: data.title,
    url: data.url,
    explanation: data.explanation,
    media_type: data.media_type,
  };
}

/**
 * Fetches Mars Rover photos from NASA API with caching and retry
 */
export async function fetchMarsPhotos(query: MarsQuery) {
  const { sol, earth_date, camera } = query;

  const params: Record<string, string | number> = {
    api_key: NASA_API_KEY,
  };

  if (sol !== undefined) params['sol'] = sol;
  if (earth_date !== undefined) params['earth_date'] = earth_date;
  if (camera !== undefined) params['camera'] = camera;

  const cacheKey = `mars_${sol || earth_date || 'latest'}_${camera || 'all'}`;

  const data = await fetchWithRetryAndCache<any>(NASA_MARS_URL, params, cacheKey);

  return data.photos.map((photo: any) => ({
    id: photo.id,
    sol: photo.sol,
    img_src: photo.img_src,
    earth_date: photo.earth_date,
    camera: photo.camera.full_name,
    rover: photo.rover.name,
  }));
}

/**
 * Fetches Near-Earth Objects (NeoWs) data from NASA API with caching and retry
 */
export async function fetchNeoWs(query: NeoWsQuery) {
  const { start_date, end_date } = query;

  const params: Record<string, string> = {
    api_key: NASA_API_KEY,
  };
  if (start_date) params['start_date'] = start_date;
  if (end_date) params['end_date'] = end_date;

  const cacheKey = `neows_${start_date || 'default'}_${end_date || 'today'}`;

  const data = await fetchWithRetryAndCache<any>(NASA_NEOWS_URL, params, cacheKey);

  // Flatten and simplify the near_earth_objects structure
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

  return simplified;
}