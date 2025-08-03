import request from 'supertest';
import app from '../src/app';

describe('GET /api/apod', () => {
  it('should return 200 and contain expected fields', async () => {
    const res = await request(app).get('/api/apod');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('date');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('url');
    expect(res.body).toHaveProperty('media_type');
  }, 15000); // allow extra time for API call
});