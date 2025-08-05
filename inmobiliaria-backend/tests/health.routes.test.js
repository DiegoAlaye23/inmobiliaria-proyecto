const request = require('supertest');
const express = require('express');
const healthRoutes = require('../routes/health.routes');

describe('GET /api/health', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use('/api/health', healthRoutes);
  });

  test('responds with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
