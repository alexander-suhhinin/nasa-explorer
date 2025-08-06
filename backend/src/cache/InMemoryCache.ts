import NodeCache from 'node-cache';
import { CacheProvider } from './CacheProvider';

export class InMemoryCache implements CacheProvider {
  private cache: NodeCache;

  constructor() {
    // checkperiod 60s to cleanup expired keys
    this.cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = this.cache.get<T>(key);
    return value ?? null;
  }

  async set<T>(key: string, value: T, ttlSeconds = 300): Promise<void> {
    this.cache.set(key, value, ttlSeconds);
  }

  async del(key: string): Promise<void> {
    this.cache.del(key);
  }
}