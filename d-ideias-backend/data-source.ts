import { DataSource } from 'typeorm';
import { Idea } from './src/domain/entities/idea.entity';
import { validateEnv } from './src/env.validation';

const env = validateEnv(process.env);

const dataSource = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [Idea],
  migrations: ['src/infrastructure/migrations/*.ts'],
  migrationsRun: false,
});

export default dataSource;
