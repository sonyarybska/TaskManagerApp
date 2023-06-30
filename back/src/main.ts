import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  await app.listen(4000);
}
bootstrap();
