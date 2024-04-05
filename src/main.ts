import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(PORT, () => {
    console.log(`Server is run on port: ${PORT}`);
  });
}
bootstrap();
