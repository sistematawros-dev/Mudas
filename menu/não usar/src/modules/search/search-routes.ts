import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { sql } from 'kysely';
import { successResponse } from '../../common/http/response.js';
import { requireAuth } from '../../auth/guards.js';

export async function searchRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    '/api/v1/search/global',
    {
      preHandler: [requireAuth],
      schema: { security: [{ bearerAuth: [] }], tags: ['Search'], summary: 'Busca global em entidades centrais' }
    },
    async (request) => {
      const { q } = z.object({ q: z.string().min(2) }).parse(request.query);
      const limit = 50;
      const people = await sql`
        select 'pessoas_empresas' as resource, id, codigo, razao_social as nome, cpf_cnpj as documento
        from app.pessoas_empresas
        where deleted_at is null
          and (razao_social ilike ${`%${q}%`} or nome_fantasia ilike ${`%${q}%`} or cpf_cnpj ilike ${`%${q}%`})
        limit ${limit}
      `.execute(app.db);

      const products = await sql`
        select 'produtos_servicos' as resource, id, codigo, descricao as nome, tipo_item as documento
        from app.produtos_servicos
        where deleted_at is null
          and (descricao ilike ${`%${q}%`} or codigo ilike ${`%${q}%`})
        limit ${limit}
      `.execute(app.db);

      return successResponse([...people.rows, ...products.rows], request.id, {
        total: people.rows.length + products.rows.length
      });
    }
  );
}


