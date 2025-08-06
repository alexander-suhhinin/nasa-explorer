import { fetchMarsPhotos } from '../services/nasa.service';

interface MarsQuery {
  sol?: number;
  earth_date?: string;
  camera?: string;
}

export async function getMarsPhotos(query: MarsQuery) {
  const { sol, earth_date, camera } = query;

  const queryParams: MarsQuery = {};
  if (sol !== undefined) queryParams.sol = sol;
  if (earth_date !== undefined) queryParams.earth_date = earth_date;
  if (camera !== undefined) queryParams.camera = camera;

  const data = await fetchMarsPhotos(queryParams);


  return data;
}