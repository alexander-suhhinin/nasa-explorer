

import request from 'supertest';
import app from '../src/app';

describe('GET /api/mars', () => {
  it('should return 200 and an array of photos', async () => {
    const res = await request(app).get('/api/mars').query({ sol: 1000 });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const photo = res.body[0];
      expect(photo).toHaveProperty('id');
      expect(photo).toHaveProperty('sol');
      expect(photo).toHaveProperty('img_src');
      expect(photo).toHaveProperty('earth_date');
      expect(photo).toHaveProperty('camera');
      expect(photo).toHaveProperty('rover');
    }
  }, 15000); // allow extra time for external API call
});