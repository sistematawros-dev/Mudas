import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { sql } from 'kysely';
import { getEntityConfig } from '../entities/entity-config.js';
import { requireAuth } from '../../auth/guards.js';
import { AppError } from '../../common/errors/app-error.js';

function toCsv(rows: Record<string, unknown>[]): string {
  if (!rows.length) return '';
  const first = rows[0] ?? {};
  const headers = Object.keys(first);
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const data = rows.map((row) => headers.map((h) => esc(row[h])).join(','));
  return [headers.join(','), ...data].join('\n');
}

export async function exportRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    '/api/v1/export/:resource',
    {
      preHandler: [requireAuth],
      schema: { security: [{ bearerAuth: [] }], tags: ['Export'], summary: 'Exporta entidade em CSV/JSON' }
    },
    async (request, reply) => {
      const params = z.object({ resource: z.string() }).parse(request.params);
      const query = z.object({ format: z.enum(['csv', 'json']).default('json') }).parse(request.query);
      const cfg = getEntityConfig(params.resource);
      if (!cfg) throw new AppError('Recurso não encontrado', 404, 'RESOURCE_NOT_FOUND');
      const table = `${cfg.schema}.${cfg.table}`;
      const rows = await sql<Record<string, unknown>>`select * from ${sql.raw(table)} where deleted_at is null limit 10000`.execute(app.db);
      if (query.format === 'csv') {
        reply.header('content-type', 'text/csv; charset=utf-8');
        return reply.send(toCsv(rows.rows));
      }
      return reply.send(rows.rows);
    }
  );
}

