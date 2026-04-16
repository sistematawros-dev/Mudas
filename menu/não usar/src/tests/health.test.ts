import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../app/app.js';

describe('infra endpoints', () => {
  const appPromise = buildApp();

  beforeAll(async () => {
    const app = await appPromise;
    await app.ready();
  });

  afterAll(async () => {
    const app = await appPromise;
    await app.close();
  });

  it('GET /api/v1/health', async () => {
    const app = await appPromise;
    const res = await app.inject({ method: 'GET', url: '/api/v1/health' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.data.status).toBe('ok');
  });
});

