import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { sql } from 'kysely';
import { getEntityConfig } from '../entities/entity-config.js';
import { AppError } from '../../common/errors/app-error.js';
import { successResponse } from '../../common/http/response.js';
import { requireAuth } from '../../auth/guards.js';
import { EntityService } from '../entities/entity-service.js';

export async function integrationRoutes(app: FastifyInstance): Promise<void> {
  const service = new EntityService(app.db);

  app.get('/api/v1/integrations/status', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Integrations'] } }, async (request) => {
    return successResponse({ status: 'ok', providers: ['generic'] }, request.id);
  });

  app.post('/api/v1/integrations/webhooks/:event', { schema: { tags: ['Integrations'] } }, async (request, reply) => {
    const event = z.object({ event: z.string() }).parse(request.params).event;
    request.log.info({ event, payload: request.body }, 'Webhook recebido');
    return reply.status(202).send(successResponse({ received: true, event }, request.id));
  });

  app.get('/api/v1/integrations/:resource/pull', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Integrations'] } }, async (request) => {
    const { resource } = z.object({ resource: z.string() }).parse(request.params);
    const cfg = getEntityConfig(resource);
    if (!cfg) throw new AppError('Recurso não encontrado', 404, 'RESOURCE_NOT_FOUND');
    const rows = await service.list(cfg, { page: 1, limit: 100, withDeleted: false });
    return successResponse(rows.rows, request.id, rows.meta);
  });

  app.get('/api/v1/integrations/:resource/delta', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Integrations'] } }, async (request) => {
    const { resource } = z.object({ resource: z.string() }).parse(request.params);
    const { since } = z.object({ since: z.string() }).parse(request.query);
    const cfg = getEntityConfig(resource);
    if (!cfg) throw new AppError('Recurso não encontrado', 404, 'RESOURCE_NOT_FOUND');
    const table = `${cfg.schema}.${cfg.table}`;
    const rows = await sql<Record<string, unknown>>`
      select * from ${sql.raw(table)}
      where updated_at >= ${since}
      order by updated_at asc
      limit 1000
    `.execute(app.db);
    return successResponse(rows.rows, request.id, { total: rows.rows.length, since });
  });

  app.post('/api/v1/integrations/:resource/push', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Integrations'] } }, async (request) => {
    const { resource } = z.object({ resource: z.string() }).parse(request.params);
    const body = z.record(z.string(), z.unknown()).parse(request.body);
    const cfg = getEntityConfig(resource);
    if (!cfg) throw new AppError('Recurso não encontrado', 404, 'RESOURCE_NOT_FOUND');
    const row = await service.create(cfg, body);
    return successResponse(row, request.id);
  });

  app.post('/api/v1/integrations/:resource/upsert', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Integrations'] } }, async (request) => {
    const { resource } = z.object({ resource: z.string() }).parse(request.params);
    const body = z.record(z.string(), z.unknown()).parse(request.body);
    const cfg = getEntityConfig(resource);
    if (!cfg || !cfg.hasExternal) throw new AppError('Recurso sem suporte a external_id', 400, 'UNSUPPORTED');

    const externalSource = String(body.external_source ?? '');
    const externalId = String(body.external_id ?? '');
    if (!externalSource || !externalId) throw new AppError('external_source e external_id são obrigatórios', 400, 'MISSING_EXTERNAL');

    try {
      const existing = await service.byExternal(cfg, externalSource, externalId);
      const updated = await service.update(cfg, Number(existing.id), body);
      return successResponse(updated, request.id);
    } catch {
      const created = await service.create(cfg, body);
      return successResponse(created, request.id);
    }
  });

  app.post('/api/v1/integrations/import/:resource', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Integrations'] } }, async (request) => {
    const { resource } = z.object({ resource: z.string() }).parse(request.params);
    const body = z.array(z.record(z.string(), z.unknown())).parse(request.body);
    const cfg = getEntityConfig(resource);
    if (!cfg) throw new AppError('Recurso não encontrado', 404, 'RESOURCE_NOT_FOUND');
    const rows = await service.bulkCreate(cfg, body);
    return successResponse(rows, request.id, { total: rows.length });
  });

  app.get('/api/v1/integrations/export/:resource', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Integrations'] } }, async (request) => {
    const { resource } = z.object({ resource: z.string() }).parse(request.params);
    const cfg = getEntityConfig(resource);
    if (!cfg) throw new AppError('Recurso não encontrado', 404, 'RESOURCE_NOT_FOUND');
    const rows = await service.list(cfg, { page: 1, limit: 1000, withDeleted: true });
    return successResponse(rows.rows, request.id, rows.meta);
  });
}



