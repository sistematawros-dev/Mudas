import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { successResponse } from '../../common/http/response.js';
import { getEntityConfig, ENTITY_CONFIGS } from './entity-config.js';
import { EntityService } from './entity-service.js';
import { AppError } from '../../common/errors/app-error.js';
import { requireAuth } from '../../auth/guards.js';

export async function entityRoutes(app: FastifyInstance): Promise<void> {
  const service = new EntityService(app.db);

  app.get(
    '/api/v1/lookups/:resource',
    { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Lookups'], summary: 'Lookup simples por recurso' } },
    async (request) => {
      const { resource } = request.params as { resource: string };
      const cfg = getEntityConfig(resource);
      if (!cfg) throw new AppError('Recurso não encontrado', 404, 'RESOURCE_NOT_FOUND');
      const list = await service.list(cfg, { page: 1, limit: 50, q: request.query ? (request.query as { q?: string }).q : undefined });
      return successResponse(list.rows, request.id, list.meta);
    }
  );

  for (const cfg of ENTITY_CONFIGS) {
    const base = `/api/v1/${cfg.resource}`;

    app.get(
      base,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Listar ${cfg.resource}` } },
      async (request) => {
        const result = await service.list(cfg, request.query as Record<string, unknown>);
        return successResponse(result.rows, request.id, result.meta);
      }
    );

    app.get(
      `${base}/by-external`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Buscar ${cfg.resource} por external` } },
      async (request) => {
        const query = z.object({ externalSource: z.string(), externalId: z.string() }).parse(request.query);
        const row = await service.byExternal(cfg, query.externalSource, query.externalId);
        return successResponse(row, request.id);
      }
    );

    app.get(
      `${base}/:id`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Detalhar ${cfg.resource}` } },
      async (request) => {
        const { id } = z.object({ id: z.coerce.number().int().positive() }).parse(request.params);
        const row = await service.getById(cfg, id, String((request.query as { withDeleted?: string })?.withDeleted) === 'true');
        return successResponse(row, request.id);
      }
    );

    app.post(
      base,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Criar ${cfg.resource}` } },
      async (request, reply) => {
        const row = await service.create(cfg, request.body as Record<string, unknown>);
        return reply.status(201).send(successResponse(row, request.id));
      }
    );

    app.put(
      `${base}/:id`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Atualizar ${cfg.resource}` } },
      async (request) => {
        const { id } = z.object({ id: z.coerce.number().int().positive() }).parse(request.params);
        const row = await service.update(cfg, id, request.body as Record<string, unknown>);
        return successResponse(row, request.id);
      }
    );

    app.patch(
      `${base}/:id`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Atualização parcial ${cfg.resource}` } },
      async (request) => {
        const { id } = z.object({ id: z.coerce.number().int().positive() }).parse(request.params);
        const row = await service.update(cfg, id, request.body as Record<string, unknown>);
        return successResponse(row, request.id);
      }
    );

    app.delete(
      `${base}/:id`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Excluir ${cfg.resource}` } },
      async (request) => {
        const { id } = z.object({ id: z.coerce.number().int().positive() }).parse(request.params);
        const row = await service.remove(cfg, id);
        return successResponse(row, request.id);
      }
    );

    app.post(
      `${base}/bulk-create`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Criação em lote ${cfg.resource}` } },
      async (request, reply) => {
        const body = z.array(z.record(z.string(), z.unknown())).parse(request.body);
        const rows = await service.bulkCreate(cfg, body);
        return reply.status(201).send(successResponse(rows, request.id, { total: rows.length }));
      }
    );

    app.post(
      `${base}/bulk-upsert`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Upsert em lote ${cfg.resource}` } },
      async (request) => {
        const body = z.array(z.record(z.string(), z.unknown())).parse(request.body);
        const created = await service.bulkCreate(cfg, body);
        return successResponse(created, request.id, { total: created.length });
      }
    );

    app.patch(
      `${base}/bulk-update`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Atualização em lote ${cfg.resource}` } },
      async (request) => {
        const body = z
          .array(z.object({ id: z.number().int().positive(), data: z.record(z.string(), z.unknown()) }))
          .parse(request.body);
        const rows = await service.bulkUpdate(cfg, body);
        return successResponse(rows, request.id, { total: rows.length });
      }
    );

    app.delete(
      `${base}/bulk-delete`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Exclusão em lote ${cfg.resource}` } },
      async (request) => {
        const body = z.object({ ids: z.array(z.number().int().positive()) }).parse(request.body);
        const rows = await service.bulkDelete(cfg, body.ids);
        return successResponse(rows, request.id, { total: rows.length });
      }
    );

    if (cfg.hasSoftDelete) {
      app.post(
        `${base}/:id/restore`,
        { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Restaurar ${cfg.resource}` } },
        async (request) => {
          const { id } = z.object({ id: z.coerce.number().int().positive() }).parse(request.params);
          const row = await service.restore(cfg, id);
          return successResponse(row, request.id);
        }
      );
    }

    app.get(
      `${base}/:id/audit`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Auditoria de ${cfg.resource}` } },
      async (request) => {
        if (!cfg.auditEnabled) throw new AppError('Auditoria não disponível para este recurso', 400, 'AUDIT_NOT_AVAILABLE');
        const { id } = z.object({ id: z.coerce.number().int().positive() }).parse(request.params);
        const rows = await service.audit(cfg, id);
        return successResponse(rows, request.id, { total: rows.length });
      }
    );

    app.get(
      `${base}/:id/:relation`,
      { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: [cfg.resource], summary: `Listar relação de ${cfg.resource}` } },
      async (request) => {
        const params = z.object({ id: z.coerce.number().int().positive(), relation: z.string() }).parse(request.params);
        const rows = await service.relation(cfg, params.id, params.relation);
        return successResponse(rows, request.id, { total: rows.length });
      }
    );
  }
}


