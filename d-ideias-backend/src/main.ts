import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validateEnv } from './env.validation';

async function bootstrap(): Promise<void> {
  const env = validateEnv(process.env);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('D+Ideias API')
    .setDescription('API de gestão de ideias para melhorias')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.enableCors({ origin: env.ALLOWED_ORIGINS.split(',') });
  await app.listen(env.API_PORT);
}

bootstrap();
