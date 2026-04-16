import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AuthService } from './auth-service.js';
import { successResponse } from '../common/http/response.js';
import { requireAuth } from './guards.js';

const loginSchema = {
  tags: ['Auth'],
  summary: 'Login com e-mail e senha',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 }
    }
  }
};

function tokenPayload(user: { id: number; email: string; roles: string[]; permissions: string[] }) {
  return {
    sub: String(user.id),
    email: user.email,
    roles: user.roles,
    scope: user.permissions
  };
}

export async function authRoutes(app: FastifyInstance): Promise<void> {
  const service = new AuthService(app.db);

  app.post('/api/v1/auth/login', { schema: loginSchema }, async (request, reply) => {
    const body = z
      .object({
        email: z.string().email(),
        password: z.string().min(6)
      })
      .parse(request.body);

    const { user, refreshToken } = await service.login(body.email, body.password, request.headers['user-agent'], request.ip);
    const accessToken = await reply.jwtSign(tokenPayload(user), { expiresIn: app.env.JWT_ACCESS_TTL });
    return reply.send(successResponse({ accessToken, refreshToken, user }, request.id));
  });

  app.post(
    '/api/v1/auth/refresh',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Renova access token usando refresh token',
        body: {
          type: 'object',
          required: ['refreshToken'],
          properties: { refreshToken: { type: 'string', minLength: 20 } }
        }
      }
    },
    async (request, reply) => {
      const body = z.object({ refreshToken: z.string().min(20) }).parse(request.body);
      const { user, refreshToken } = await service.refresh(body.refreshToken, request.headers['user-agent'], request.ip);
      const accessToken = await reply.jwtSign(tokenPayload(user), { expiresIn: app.env.JWT_ACCESS_TTL });
      return reply.send(successResponse({ accessToken, refreshToken, user }, request.id));
    }
  );

  app.post(
    '/api/v1/auth/logout',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Revoga refresh token',
        body: {
          type: 'object',
          required: ['refreshToken'],
          properties: { refreshToken: { type: 'string', minLength: 20 } }
        }
      }
    },
    async (request) => {
      const body = z.object({ refreshToken: z.string().min(20) }).parse(request.body);
      const revoked = await service.revokeRefreshToken(body.refreshToken);
      return successResponse({ revoked }, request.id);
    }
  );

  app.post(
    '/api/v1/auth/revoke',
    {
      preHandler: [requireAuth],
      schema: {
        security: [{ bearerAuth: [] }],
        tags: ['Auth'] ,
        summary: 'Revoga refresh token (admin/user autenticado)',
        body: {
          type: 'object',
          required: ['refreshToken'],
          properties: { refreshToken: { type: 'string', minLength: 20 } }
        }
      }
    },
    async (request) => {
      const body = z.object({ refreshToken: z.string().min(20) }).parse(request.body);
      const revoked = await service.revokeRefreshToken(body.refreshToken);
      return successResponse({ revoked }, request.id);
    }
  );

  app.get(
    '/api/v1/auth/me',
    {
      preHandler: [requireAuth],
      schema: { security: [{ bearerAuth: [] }], tags: ['Auth'], summary: 'Dados do usuario autenticado' }
    },
    async (request) => {
      const userId = Number((request.user as { sub: string }).sub);
      const me = await service.me(userId);
      return successResponse(me, request.id);
    }
  );

  app.post(
    '/api/v1/auth/change-password',
    {
      preHandler: [requireAuth],
      schema: {
        security: [{ bearerAuth: [] }],
        tags: ['Auth'] ,
        summary: 'Troca senha com validação da senha atual',
        body: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: { type: 'string', minLength: 6 },
            newPassword: { type: 'string', minLength: 8 }
          }
        }
      }
    },
    async (request) => {
      const body = z.object({ currentPassword: z.string().min(6), newPassword: z.string().min(8) }).parse(request.body);
      const userId = Number((request.user as { sub: string }).sub);
      const changed = await service.changePassword(userId, body.currentPassword, body.newPassword);
      return successResponse(changed, request.id);
    }
  );

  app.post(
    '/api/v1/auth/forgot-password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Solicita reset por e-mail, CPF ou celular',
        body: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            cpf: { type: 'string' },
            phone: { type: 'string' }
          }
        }
      }
    },
    async (request) => {
      const body = z
        .object({
          email: z.string().email().optional(),
          cpf: z.string().optional(),
          phone: z.string().optional()
        })
        .refine((v) => v.email || v.cpf || v.phone, { message: 'Informe email, cpf ou phone' })
        .parse(request.body);
      const result = await service.forgotPassword(body, request.headers['user-agent'], request.ip);
      return successResponse(result, request.id);
    }
  );

  app.post(
    '/api/v1/auth/reset-password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Reset de senha com token',
        body: {
          type: 'object',
          required: ['token', 'newPassword'],
          properties: {
            token: { type: 'string' },
            newPassword: { type: 'string', minLength: 8 }
          }
        }
      }
    },
    async (request) => {
      const body = z.object({ token: z.string(), newPassword: z.string().min(8) }).parse(request.body);
      const changed = await service.resetPassword(body.token, body.newPassword);
      return successResponse(changed, request.id);
    }
  );
}


