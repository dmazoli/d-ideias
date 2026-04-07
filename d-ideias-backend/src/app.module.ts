import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeasApiModule } from './api/controllers';
import { validateEnv } from './env.validation';
import { getDatabaseConfig } from './infrastructure/config/database.config';
import { RepositoriesModule } from './infrastructure/repositories';

const env = validateEnv(process.env);

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig(env)),
    RepositoriesModule,
    IdeasApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
