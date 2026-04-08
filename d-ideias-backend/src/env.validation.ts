import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  TYPEORM_LOGGING: z
    .enum(['true', 'false'])
    .transform((value: string): boolean => value === 'true')
    .default(false),
  API_PORT: z.string().regex(/^\d+$/).transform(Number).default(3000),
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z.string().regex(/^\d+$/).transform(Number).default(5432),
  POSTGRES_DB: z.string().default('d_ideias'),
  POSTGRES_USER: z.string().default('postgres'),
  POSTGRES_PASSWORD: z.string().default('postgres'),
  ALLOWED_ORIGINS: z.string().default('*'),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: NodeJS.ProcessEnv): Env {
  return envSchema.parse(env);
}
