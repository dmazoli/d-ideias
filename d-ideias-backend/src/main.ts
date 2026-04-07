import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validateEnv } from './env.validation';

async function bootstrap(): Promise<void> {
  const env = validateEnv(process.env);
  console.log(env);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('D+Ideias API')
    .setDescription('API de gestão de ideias para melhorias')
    .setVersion('1.0.0')
    .addTag('ideas', 'Endpoints de ideias')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.API_PORT);
}

bootstrap();
