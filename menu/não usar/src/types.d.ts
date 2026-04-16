import 'fastify';
import type { AuthenticatedUser } from './auth/auth-service.js';

declare module 'fastify' {
  interface FastifyRequest {
    userContext?: AuthenticatedUser;
  }
}

