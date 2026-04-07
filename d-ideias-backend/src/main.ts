import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnv } from './env.validation';

async function bootstrap() {
  const env = validateEnv(process.env);
  const app = await NestFactory.create(AppModule);
  await app.listen(env.API_PORT);
}
bootstrap();
