import { CacheProvider } from './CacheProvider';
import { InMemoryCache } from './InMemoryCache';
import { RedisCache } from './RedisCache';

let cacheInstance: CacheProvider;

export function createCache(): CacheProvider {
  if (cacheInstance) return cacheInstance;

  const type = (process.env['CACHE_TYPE'] || 'memory').toLowerCase();

  if (type === 'redis') {
    const url = process.env['REDIS_URL'] || 'redis://localhost:6379';
    cacheInstance = new RedisCache(url);
    console.log(`🚀 Using Redis cache: ${url}`);
  } else {
    cacheInstance = new InMemoryCache();
    console.log('🚀 Using In-Memory cache');
  }

  return cacheInstance;
}