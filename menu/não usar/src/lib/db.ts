import { Kysely, PostgresDialect, sql } from 'kysely';
import pg from 'pg';
import { env } from '../config/env.js';

export type RowRecord = Record<string, unknown>;
export interface DB {
  [table: string]: RowRecord;
}

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  min: env.DB_POOL_MIN,
  max: env.DB_POOL_MAX,
  statement_timeout: env.DB_STATEMENT_TIMEOUT_MS,
  query_timeout: env.DB_QUERY_TIMEOUT_MS
});

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool
  })
});

export async function closeDb(): Promise<void> {
  await db.destroy();
}

export async function healthDb(): Promise<boolean> {
  try {
    await sql`select 1`.execute(db);
    return true;
  } catch {
    return false;
  }
}

