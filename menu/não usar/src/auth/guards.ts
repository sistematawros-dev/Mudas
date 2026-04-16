import type { FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from '../common/errors/app-error.js';

export async function requireAuth(request: FastifyRequest, _reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify<{ sub: string; scope?: string[] }>();
  } catch {
    throw new AppError('Não autenticado', 401, 'UNAUTHORIZED');
  }
}

export function requirePermission(permission: string) {
  return async function guard(request: FastifyRequest): Promise<void> {
    const has = request.userContext?.permissions?.includes(permission);
    if (!has) throw new AppError('Sem permissão', 403, 'FORBIDDEN');
  };
}

