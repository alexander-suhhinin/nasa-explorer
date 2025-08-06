import { fetchNeoWs } from '../services/nasa.service';

interface NeoWsQuery {
  start_date?: string;
  end_date?: string;
}

export async function getNeoWs(query: NeoWsQuery) {
  const { start_date, end_date } = query;

  const queryParams: NeoWsQuery = {};
  if (start_date !== undefined) queryParams.start_date = start_date;
  if (end_date !== undefined) queryParams.end_date = end_date;

  const data = await fetchNeoWs(queryParams);

  return data;
}