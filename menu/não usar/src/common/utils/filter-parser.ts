import { AppError } from '../errors/app-error.js';

export interface ListQuery {
  page: number;
  limit: number;
  sort?: string;
  order: 'asc' | 'desc';
  q?: string;
  fields?: string[];
  include?: string[];
  withDeleted: boolean;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
  externalSource?: string;
  externalId?: string;
  filters: Array<{ field: string; op: string; value: string }>;
}

const allowedOps = new Set(['eq', 'neq', 'like', 'gte', 'lte', 'gt', 'lt', 'in', 'isNull']);

export function parseListQuery(query: Record<string, unknown>, allowedFields: string[]): ListQuery {
  const page = Math.max(1, Number(query.page ?? 1));
  const limit = Math.min(200, Math.max(1, Number(query.limit ?? 20)));
  const sort = query.sort ? String(query.sort) : undefined;
  const order = String(query.order ?? 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';
  const q = query.q ? String(query.q) : undefined;
  const fields = query.fields ? String(query.fields).split(',').map((v) => v.trim()).filter(Boolean) : undefined;
  const include = query.include ? String(query.include).split(',').map((v) => v.trim()).filter(Boolean) : undefined;
  const withDeleted = String(query.withDeleted ?? 'false') === 'true';

  if (sort && !allowedFields.includes(sort)) {
    throw new AppError(`Campo de ordenação inválido: ${sort}`, 400, 'INVALID_SORT');
  }

  if (fields && fields.some((f) => !allowedFields.includes(f))) {
    throw new AppError('fields contém colunas inválidas', 400, 'INVALID_FIELDS');
  }

  const filters: Array<{ field: string; op: string; value: string }> = [];
  for (const [key, value] of Object.entries(query)) {
    const match = key.match(/^filter\[(.+)\]\[(.+)\]$/);
    if (!match) continue;
    const field = match[1];
    const op = match[2];
    if (!allowedFields.includes(field)) {
      throw new AppError(`Filtro em campo inválido: ${field}`, 400, 'INVALID_FILTER_FIELD');
    }
    if (!allowedOps.has(op)) {
      throw new AppError(`Operador inválido: ${op}`, 400, 'INVALID_FILTER_OP');
    }
    filters.push({ field, op, value: String(value) });
  }

  return {
    page,
    limit,
    sort,
    order,
    q,
    fields,
    include,
    withDeleted,
    createdFrom: query.createdFrom ? String(query.createdFrom) : undefined,
    createdTo: query.createdTo ? String(query.createdTo) : undefined,
    updatedFrom: query.updatedFrom ? String(query.updatedFrom) : undefined,
    updatedTo: query.updatedTo ? String(query.updatedTo) : undefined,
    externalSource: query.externalSource ? String(query.externalSource) : undefined,
    externalId: query.externalId ? String(query.externalId) : undefined,
    filters
  };
}

