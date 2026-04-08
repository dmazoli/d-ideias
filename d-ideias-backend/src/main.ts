import 'tsconfig-paths/register';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import { validateEnv } from './env.validation';

async function bootstrap(): Promise<void> {
  const env = validateEnv(process.env);
  const app = await NestFactory.create(AppModule);
  const httpLogger = new Logger('HTTP');

  app.use((request: Request, response: Response, next: NextFunction): void => {
    const startedAt = process.hrtime.bigint();

    response.on('finish', (): void => {
      const durationMs =
        Number(process.hrtime.bigint() - startedAt) / 1_000_000;
      httpLogger.log(
        `${request.method} ${request.originalUrl} ${response.statusCode} ${durationMs.toFixed(1)}ms`,
      );
    });

    next();
  });

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
