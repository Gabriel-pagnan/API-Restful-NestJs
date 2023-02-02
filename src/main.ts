import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { LogInterceptors } from './interceptors/log.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // interceptor de forma global
  // app.useGlobalInterceptors(new LogInterceptors());

  await app.listen(3000);
}
bootstrap();
