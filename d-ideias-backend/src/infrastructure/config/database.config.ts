import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from '../../env.validation';

export function getDatabaseConfig(env: Env): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    entities: ['src/**/*.entity.ts', 'src/**/*.schema.ts'],
    migrations: ['src/infrastructure/migrations/*.ts'],
    synchronize: env.NODE_ENV === 'development',
    logging: env.NODE_ENV === 'development',
  };
}
