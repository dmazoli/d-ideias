import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from '../../env.validation';
import { Idea } from '../../domain/entities';

export function getDatabaseConfig(env: Env): TypeOrmModuleOptions {
  const isProduction = env.NODE_ENV === 'production';
  const migrationsPattern = isProduction
    ? 'dist/infrastructure/migrations/*.js'
    : undefined;

  return {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    entities: [Idea],
    migrations: migrationsPattern ? [migrationsPattern] : [],
    synchronize: false,
    logging: env.TYPEORM_LOGGING,
  };
}
