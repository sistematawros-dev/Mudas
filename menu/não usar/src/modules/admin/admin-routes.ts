import type { FastifyInstance } from 'fastify';
import { sql } from 'kysely';
import { successResponse } from '../../common/http/response.js';
import { requireAuth, requirePermission } from '../../auth/guards.js';

export async function adminRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/v1/admin/audit', { preHandler: [requireAuth, requirePermission('cadastros.manage')], schema: { security: [{ bearerAuth: [] }], tags: ['Admin'] } }, async (request) => {
    const rows = await sql`select * from audit.events order by occurred_at desc limit 200`.execute(app.db);
    return successResponse(rows.rows, request.id, { total: rows.rows.length });
  });

  app.get('/api/v1/admin/errors', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Admin'] } }, async (request) => {
    return successResponse({ message: 'Integre com APM/Sentry para central de erros' }, request.id);
  });

  app.get('/api/v1/admin/metrics', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Admin'] } }, async (request) => {
    const dbSize = await sql<{ bytes: string }>`select pg_database_size(current_database())::text as bytes`.execute(app.db);
    return successResponse({ databaseSizeBytes: Number(dbSize.rows[0]?.bytes ?? 0) }, request.id);
  });

  app.get('/api/v1/admin/permissions', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Admin'] } }, async (request) => {
    const rows = await sql`select * from auth.permissions where deleted_at is null order by id`.execute(app.db);
    return successResponse(rows.rows, request.id, { total: rows.rows.length });
  });

  app.get('/api/v1/admin/sessions', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Admin'] } }, async (request) => {
    const rows = await sql`
      select id, user_id, created_at, expires_at, revoked_at, last_used_at, user_agent, ip_address
      from auth.refresh_tokens
      where deleted_at is null
      order by created_at desc
      limit 200
    `.execute(app.db);
    return successResponse(rows.rows, request.id, { total: rows.rows.length });
  });

  app.get('/api/v1/admin/users', { preHandler: [requireAuth], schema: { security: [{ bearerAuth: [] }], tags: ['Admin'] } }, async (request) => {
    const rows = await sql`
      select id, email::text as email, phone, cpf, name, is_active, created_at, updated_at
      from auth.users
      where deleted_at is null
      order by id desc
      limit 200
    `.execute(app.db);
    return successResponse(rows.rows, request.id, { total: rows.rows.length });
  });
}


