import { fetchApod } from '../services/nasa.service';

/**
 * Controller to get Astronomy Picture of the Day
 */
export async function getApod() {
  return fetchApod();
}
