import request from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
  it('should return 200 OK with status and timestamp', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('timestamp');
  });
});