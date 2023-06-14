import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT ? process.env.PORT : 4000;
  await app.listen(port);
  logger.log(`Application listening port: ${port}`);
}
bootstrap();
