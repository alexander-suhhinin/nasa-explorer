

import request from 'supertest';
import app from '../src/app';

describe('GET /api/neows', () => {
  it('should return 200 and an array of near-earth objects', async () => {
    const res = await request(app).get('/api/neows').query({
      start_date: '2025-01-01',
      end_date: '2025-01-02',
    });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const obj = res.body[0];
      expect(obj).toHaveProperty('id');
      expect(obj).toHaveProperty('name');
      expect(obj).toHaveProperty('is_potentially_hazardous_asteroid');
      expect(obj).toHaveProperty('estimated_diameter_m');
      expect(obj).toHaveProperty('close_approach_date');
      expect(obj).toHaveProperty('relative_velocity_kph');
      expect(obj).toHaveProperty('miss_distance_km');
    }
  }, 20000); // Allow extra time for external API call
});