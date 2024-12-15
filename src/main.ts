import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Habilt global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Delete properties not in the DTO
      transform: true, //Transform the data to DTO
      forbidNonWhitelisted: true, //return 400 if a property is not in the DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
