import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z.string().default('info'),
  APP_NAME: z.string().default('tawros-api'),
  APP_VERSION: z.string().default('1.0.0'),
  DATABASE_URL: z.string().min(1),
  DB_POOL_MIN: z.coerce.number().int().min(1).default(2),
  DB_POOL_MAX: z.coerce.number().int().min(1).default(20),
  DB_STATEMENT_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
  DB_QUERY_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL_DAYS: z.coerce.number().int().positive().default(30),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(200),
  RATE_LIMIT_WINDOW: z.string().default('1 minute'),
  MAX_PAYLOAD_BYTES: z.coerce.number().int().positive().default(1048576)
});

export const env = envSchema.parse(process.env);

