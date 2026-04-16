import { Kysely, sql } from 'kysely';
import { AppError } from '../../common/errors/app-error.js';
import { parseListQuery } from '../../common/utils/filter-parser.js';
import type { DB } from '../../lib/db.js';
import type { EntityConfig } from './entity-config.js';

export class EntityService {
  constructor(private readonly db: Kysely<DB>) {}

  private tableName(config: EntityConfig): string {
    return `${config.schema}.${config.table}`;
  }

  async list(config: EntityConfig, rawQuery: Record<string, unknown>) {
    const q = parseListQuery(rawQuery, config.filterableFields);
    const offset = (q.page - 1) * q.limit;
    const tableName = this.tableName(config);

    let query = this.db.selectFrom(sql.raw(tableName).as('t')).selectAll('t');
    let countQuery = this.db.selectFrom(sql.raw(tableName).as('t')).select(sql<number>`count(*)`.as('total'));

    if (config.hasSoftDelete && !q.withDeleted) {
      query = query.where('t.deleted_at', 'is', null);
      countQuery = countQuery.where('t.deleted_at', 'is', null);
    }

    if (q.q && config.searchableFields.length) {
      query = query.where((eb) => eb.or(config.searchableFields.map((f) => eb(sql.ref(`t.${f}`), 'ilike', `%${q.q}%`))));
      countQuery = countQuery.where((eb) =>
        eb.or(config.searchableFields.map((f) => eb(sql.ref(`t.${f}`), 'ilike', `%${q.q}%`)))
      );
    }

    if (q.externalSource) {
      query = query.where('t.external_source', '=', q.externalSource);
      countQuery = countQuery.where('t.external_source', '=', q.externalSource);
    }
    if (q.externalId) {
      query = query.where('t.external_id', '=', q.externalId);
      countQuery = countQuery.where('t.external_id', '=', q.externalId);
    }

    if (q.createdFrom) {
      query = query.where('t.created_at', '>=', q.createdFrom);
      countQuery = countQuery.where('t.created_at', '>=', q.createdFrom);
    }
    if (q.createdTo) {
      query = query.where('t.created_at', '<=', q.createdTo);
      countQuery = countQuery.where('t.created_at', '<=', q.createdTo);
    }
    if (q.updatedFrom) {
      query = query.where('t.updated_at', '>=', q.updatedFrom);
      countQuery = countQuery.where('t.updated_at', '>=', q.updatedFrom);
    }
    if (q.updatedTo) {
      query = query.where('t.updated_at', '<=', q.updatedTo);
      countQuery = countQuery.where('t.updated_at', '<=', q.updatedTo);
    }

    for (const f of q.filters) {
      const col = sql.ref(`t.${f.field}`);
      if (f.op === 'isNull') {
        const bool = f.value === 'true';
        query = query.where(col, bool ? 'is' : 'is not', null);
        countQuery = countQuery.where(col, bool ? 'is' : 'is not', null);
      } else if (f.op === 'in') {
        const values = f.value.split(',').map((v) => v.trim()).filter(Boolean);
        query = query.where(col, 'in', values);
        countQuery = countQuery.where(col, 'in', values);
      } else if (f.op === 'like') {
        query = query.where(col, 'ilike', `%${f.value}%`);
        countQuery = countQuery.where(col, 'ilike', `%${f.value}%`);
      } else {
        const map: Record<string, '=' | '!=' | '>=' | '<=' | '>' | '<'> = {
          eq: '=',
          neq: '!=',
          gte: '>=',
          lte: '<=',
          gt: '>',
          lt: '<'
        };
        const op = map[f.op] ?? '=';
        query = query.where(col, op, f.value);
        countQuery = countQuery.where(col, op, f.value);
      }
    }

    const sortField = q.sort ?? config.defaultSort;
    query = query.orderBy(sql.ref(`t.${sortField}`), q.order).limit(q.limit).offset(offset);

    const [rows, totalRes] = await Promise.all([query.execute(), countQuery.executeTakeFirst()]);
    const total = Number(totalRes?.total ?? 0);
    const totalPages = Math.ceil(total / q.limit) || 1;
    return { rows, meta: { page: q.page, limit: q.limit, total, totalPages } };
  }

  async getById(config: EntityConfig, id: number, withDeleted = false) {
    const tableName = this.tableName(config);
    let query = this.db.selectFrom(sql.raw(tableName).as('t')).selectAll('t').where('t.id', '=', id);
    if (config.hasSoftDelete && !withDeleted) query = query.where('t.deleted_at', 'is', null);
    const row = await query.executeTakeFirst();
    if (!row) throw new AppError('Registro não encontrado', 404, 'NOT_FOUND');
    return row;
  }

  async byExternal(config: EntityConfig, externalSource: string, externalId: string) {
    const tableName = this.tableName(config);
    const row = await this.db
      .selectFrom(sql.raw(tableName).as('t'))
      .selectAll('t')
      .where('t.external_source', '=', externalSource)
      .where('t.external_id', '=', externalId)
      .where('t.deleted_at', 'is', null)
      .executeTakeFirst();
    if (!row) throw new AppError('Registro não encontrado', 404, 'NOT_FOUND');
    return row;
  }

  private sanitizePayload(config: EntityConfig, payload: Record<string, unknown>, mode: 'create' | 'update') {
    const allowed = mode === 'create' ? config.creatableFields : config.updatableFields;
    const sanitized: Record<string, unknown> = {};
    for (const k of allowed) {
      if (payload[k] !== undefined) sanitized[k] = payload[k];
    }
    if (!Object.keys(sanitized).length) throw new AppError('Payload sem campos permitidos', 400, 'EMPTY_PAYLOAD');
    return sanitized;
  }

  async create(config: EntityConfig, payload: Record<string, unknown>) {
    const tableName = this.tableName(config);
    const data = this.sanitizePayload(config, payload, 'create');
    const row = await (this.db as any).insertInto(tableName).values(data).returningAll().executeTakeFirst();
    return row;
  }

  async bulkCreate(config: EntityConfig, payloads: Array<Record<string, unknown>>) {
    const tableName = this.tableName(config);
    if (!payloads.length) return [];
    const values = payloads.map((p) => this.sanitizePayload(config, p, 'create'));
    const rows = await (this.db as any).insertInto(tableName).values(values).returningAll().execute();
    return rows;
  }

  async update(config: EntityConfig, id: number, payload: Record<string, unknown>) {
    const tableName = this.tableName(config);
    const data = this.sanitizePayload(config, payload, 'update');
    const row = await (this.db as any)
      .updateTable(tableName)
      .set(data)
      .where('id', '=', id)
      .where(config.hasSoftDelete ? sql`deleted_at is null` : sql`true`)
      .returningAll()
      .executeTakeFirst();
    if (!row) throw new AppError('Registro não encontrado', 404, 'NOT_FOUND');
    return row;
  }

  async bulkUpdate(config: EntityConfig, payloads: Array<{ id: number; data: Record<string, unknown> }>) {
    const updated: unknown[] = [];
    for (const item of payloads) {
      updated.push(await this.update(config, item.id, item.data));
    }
    return updated;
  }

  async remove(config: EntityConfig, id: number) {
    const tableName = this.tableName(config);
    if (config.hasSoftDelete) {
      const row = await (this.db as any)
        .updateTable(tableName)
        .set({ deleted_at: sql`now()` })
        .where('id', '=', id)
        .where('deleted_at', 'is', null)
        .returningAll()
        .executeTakeFirst();
      if (!row) throw new AppError('Registro não encontrado', 404, 'NOT_FOUND');
      return row;
    }
    const row = await (this.db as any).deleteFrom(tableName).where('id', '=', id).returningAll().executeTakeFirst();
    if (!row) throw new AppError('Registro não encontrado', 404, 'NOT_FOUND');
    return row;
  }

  async bulkDelete(config: EntityConfig, ids: number[]) {
    const rows: unknown[] = [];
    for (const id of ids) rows.push(await this.remove(config, id));
    return rows;
  }

  async restore(config: EntityConfig, id: number) {
    if (!config.hasSoftDelete) throw new AppError('Restauração não aplicável', 400, 'RESTORE_NOT_SUPPORTED');
    const tableName = this.tableName(config);
    const row = await (this.db as any)
      .updateTable(tableName)
      .set({ deleted_at: null })
      .where('id', '=', id)
      .where('deleted_at', 'is not', null)
      .returningAll()
      .executeTakeFirst();
    if (!row) throw new AppError('Registro não encontrado ou não deletado', 404, 'NOT_FOUND');
    return row;
  }

  async audit(config: EntityConfig, id: number) {
    const tableName = `${config.schema}.${config.table}`;
    return this.db
      .selectFrom('audit.events as a')
      .selectAll('a')
      .where('a.table_name', '=', tableName)
      .where('a.record_id', '=', id)
      .orderBy('a.occurred_at', 'desc')
      .execute();
  }

  async relation(config: EntityConfig, id: number, relationName: string) {
    const relation = config.relations?.find((r) => r.name === relationName);
    if (!relation) throw new AppError('Relação não encontrada', 404, 'RELATION_NOT_FOUND');
    const tableName = `${config.schema}.${relation.table}`;
    return this.db
      .selectFrom(sql.raw(tableName).as('r'))
      .selectAll('r')
      .where(sql.ref(`r.${relation.targetKey}`), '=', id)
      .where('r.deleted_at', 'is', null)
      .execute();
  }
}
