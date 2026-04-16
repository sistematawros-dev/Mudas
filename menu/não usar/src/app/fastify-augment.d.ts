import 'fastify';
import type { Kysely } from 'kysely';
import type { DB } from '../lib/db.js';
import type { env } from '../config/env.js';

declare module 'fastify' {
  interface FastifyInstance {
    db: Kysely<DB>;
    env: typeof env;
  }
}

