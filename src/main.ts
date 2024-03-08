import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Сервис для работы с палитрами')
  .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api', app, document)
  await app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));
}
bootstrap();
