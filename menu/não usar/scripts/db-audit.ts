import { db, closeDb } from '../src/lib/db.js';
import { sql } from 'kysely';

async function run() {
  const schemas = await sql<{ nspname: string }>`
    select nspname from pg_namespace
    where nspname in ('app','auth','audit')
    order by 1
  `.execute(db);
  console.log('schemas', schemas.rows.map((r) => r.nspname));

  const tables = await sql<{ table_schema: string; table_name: string }>`
    select table_schema, table_name
    from information_schema.tables
    where table_schema in ('app','auth','audit')
    order by table_schema, table_name
  `.execute(db);
  console.log('tables', tables.rows.length);
}

run()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDb();
  });

