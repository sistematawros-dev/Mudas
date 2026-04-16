import { buildApp } from './app/app.js';
import { env } from './config/env.js';
import { closeDb } from './lib/db.js';

const app = await buildApp();

async function shutdown(signal: string) {
  app.log.info({ signal }, 'Shutting down');
  await app.close();
  await closeDb();
  process.exit(0);
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

try {
  await app.listen({ host: env.HOST, port: env.PORT });
  app.log.info({ host: env.HOST, port: env.PORT }, 'Server started');
} catch (err) {
  app.log.error({ err }, 'Startup failed');
  process.exit(1);
}

