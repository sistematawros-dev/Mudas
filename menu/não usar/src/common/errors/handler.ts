import type { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { AppError } from './app-error.js';
import { errorResponse } from '../http/response.js';

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error, request, reply) => {
    const requestId = request.id;

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorResponse(error.message, requestId, error.code, error.details));
    }

    if (error instanceof ZodError) {
      return reply.status(400).send(errorResponse('Payload inválido', requestId, 'VALIDATION_ERROR', error.issues));
    }

    if ((error as { code?: string }).code === '23505') {
      return reply
        .status(409)
        .send(errorResponse('Violação de unicidade', requestId, 'UNIQUE_VIOLATION', (error as Error).message));
    }

    request.log.error({ err: error }, 'Unhandled error');
    return reply.status(500).send(errorResponse('Erro interno', requestId));
  });
}

