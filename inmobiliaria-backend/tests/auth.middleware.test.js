const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/auth.middleware');

const SECRET_KEY = 'secreto-super-seguro';

describe('Auth middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.get('/protected', verifyToken, (req, res) => {
      res.status(200).json({ message: 'ok' });
    });
  });

  test('Missing Authorization header -> 403 response', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: 'Token no proporcionado' });
  });

  test('Invalid token -> 401 response', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Token inválido o expirado' });
  });

  test('Valid token -> request proceeds via next', () => {
    const token = jwt.sign({ id: 1 }, SECRET_KEY);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
