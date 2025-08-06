import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

const nasaApiKey = process.env['NASA_API_KEY'] || 'DEMO_KEY';

const nasaApodUrl = process.env['NASA_APOD_URL'] || 'https://api.nasa.gov/planetary/apod';
const nasaMarsUrl = process.env['NASA_MARS_URL'] || 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const nasaNeoWsUrl = process.env['NASA_NEOWS_URL'] || 'https://api.nasa.gov/neo/rest/v1/feed';

const defaultTtl = Number(process.env['CACHE_TTL'] || 300);
const port = process.env['PORT'] || 5000;
// @ts-ignore
console.log('PORT:', process.env['PORT'])
export default {
    nasaApiKey,
    nasaApodUrl,
    nasaMarsUrl,
    nasaNeoWsUrl,
    defaultTtl,
    port,
}