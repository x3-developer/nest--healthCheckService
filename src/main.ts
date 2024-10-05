import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule);
  await app.listen();

  Logger.log('Microservice is running...');
}
void bootstrap();
