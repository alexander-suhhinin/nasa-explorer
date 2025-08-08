

import axios from 'axios';

// Base URL from Vite environment
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ApodResponse {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: string;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: string;
  rover: string;
}

export interface NeoObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous: boolean;
  estimated_diameter_m: number;
  close_approach_date: string;
  relative_velocity_kph: string;
  miss_distance_km: string;
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// APOD
export const getApod = async (): Promise<ApodResponse> => {
  const res = await api.get<ApodResponse>('/api/apod');
  if (res.status !== 200) {
    throw new Error(`NeoWs API failed: ${res.status}`);
  }

  return res.data;
};

// Mars Rover Photos
export const getMarsPhotos = async (params?: {
  sol?: number;
  earth_date?: string;
  camera?: string;
}): Promise<MarsPhoto[]> => {
  const res = await api.get<MarsPhoto[]>('/api/mars', { params });
  if (res.status !== 200) {
    throw new Error(`NeoWs API failed: ${res.status}`);
  }

  return res.data;
};

// Near-Earth Objects
export const getNeoWs = async (params?: {
  start_date?: string;
  end_date?: string;
}): Promise<NeoObject[]> => {
  const res = await api.get<NeoObject[]>('/api/neows', { params });
  if (res.status !== 200) {
    throw new Error(`NeoWs API failed: ${res.status}`);
  }

  return res.data;
};