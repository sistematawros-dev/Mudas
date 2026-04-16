import Fastify, { type FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import { env } from '../config/env.js';
import { db, healthDb } from '../lib/db.js';
import { registerErrorHandler } from '../common/errors/handler.js';
import { successResponse } from '../common/http/response.js';
import { authRoutes } from '../auth/auth-routes.js';
import { entityRoutes } from '../modules/entities/entity-routes.js';
import { searchRoutes } from '../modules/search/search-routes.js';
import { exportRoutes } from '../modules/export/export-routes.js';
import { integrationRoutes } from '../modules/integrations/integration-routes.js';
import { adminRoutes } from '../modules/admin/admin-routes.js';
import { AuthService } from '../auth/auth-service.js';
import { randomUUID } from 'node:crypto';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL
    },
    bodyLimit: env.MAX_PAYLOAD_BYTES,
    genReqId: (req) => (req.headers['x-request-id'] as string | undefined) ?? randomUUID()
  });

  app.decorate('db', db);
  app.decorate('env', env);

  await app.register(cors, {
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'X-Request-Id'],
    exposedHeaders: ['X-Request-Id'],
    credentials: true,
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      if (origin === 'null' && env.NODE_ENV === 'development') {
        return cb(null, origin);
      }

      const configured = env.CORS_ORIGIN.split(',')
        .map((value) => value.trim())
        .filter(Boolean);

      if (configured.includes(origin)) return cb(null, origin);

      const isDev = env.NODE_ENV === 'development';
      if (isDev) {
        try {
          const url = new URL(origin);
          const host = url.hostname.toLowerCase();
          const isLocalhost = host === 'localhost' || host === '127.0.0.1' || host === '::1';
          const isPrivateClassA = /^10\./.test(host);
          const isPrivateClassC = /^192\.168\./.test(host);
          const isPrivateClassB = /^172\.(1[6-9]|2\d|3[0-1])\./.test(host);

          if (isLocalhost || isPrivateClassA || isPrivateClassB || isPrivateClassC) {
            return cb(null, origin);
          }
        } catch {
          // ignore and deny below
        }
      }

      return cb(new Error('Origin não permitido pelo CORS'), false);
    }
  });


  await app.register(helmet, {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        upgradeInsecureRequests: env.NODE_ENV === 'production' ? [] : null
      }
    }
  });

  await app.register(rateLimit, { max: env.RATE_LIMIT_MAX, timeWindow: env.RATE_LIMIT_WINDOW });
  await app.register(jwt, {
    secret: env.JWT_ACCESS_SECRET,
    sign: {}
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'TAWROS API',
        version: env.APP_VERSION,
        description: 'API REST para frontend TAWROS, integra��es e automa��es'
      },
      servers: [{ url: `http://localhost:${env.PORT}` }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }
  });

  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: false },
    staticCSP: false
  });

  app.get('/openapi.json', async (_req, reply) => reply.send(app.swagger()));

  app.addHook('onRequest', async (request, reply) => {
    reply.header('x-request-id', request.id);
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return;
    try {
      await request.jwtVerify<{ sub: string }>();
      const userId = Number((request.user as { sub: string }).sub);
      if (!Number.isNaN(userId)) {
        request.userContext = await new AuthService(app.db).me(userId);
      }
    } catch {
      // silencioso: rotas protegidas validam explicitamente
    }
  });

  app.addHook('onSend', async (request, reply, payload) => {
    if (request.url.startsWith('/docs')) {
      reply.removeHeader('content-security-policy');
    }
    return payload;
  });

  app.get('/api/v1/health', { schema: { tags: ['Infra'] } }, async (request) =>
    successResponse({ status: 'ok', service: env.APP_NAME }, request.id)
  );
  app.get('/api/v1/liveness', { schema: { tags: ['Infra'] } }, async (request) =>
    successResponse({ alive: true }, request.id)
  );
  app.get('/api/v1/readiness', { schema: { tags: ['Infra'] } }, async (request, reply) => {
    const dbOk = await healthDb();
    if (!dbOk) return reply.status(503).send(successResponse({ ready: false, db: false }, request.id));
    return reply.send(successResponse({ ready: true, db: true }, request.id));
  });
  app.get('/api/v1/version', { schema: { tags: ['Infra'] } }, async (request) =>
    successResponse({ version: env.APP_VERSION }, request.id)
  );

  await app.register(authRoutes);
  await app.register(entityRoutes);
  await app.register(searchRoutes);
  await app.register(exportRoutes);
  await app.register(integrationRoutes);
  await app.register(adminRoutes);

  registerErrorHandler(app);
  return app;
}


