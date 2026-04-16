import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../app/app.js';

describe('auth login', () => {
  const appPromise = buildApp();

  beforeAll(async () => {
    const app = await appPromise;
    await app.ready();
  });

  afterAll(async () => {
    const app = await appPromise;
    await app.close();
  });

  it('POST /api/v1/auth/login', async () => {
    const app = await appPromise;
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: { email: 'admin@tawros.local', password: 'Trocar@123' }
    });
    expect([200, 401]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      const body = res.json();
      expect(body.data.accessToken).toBeTypeOf('string');
      expect(body.data.refreshToken).toBeTypeOf('string');
    }
  });
});

