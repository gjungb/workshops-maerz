import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('Bookmonkey example')
    .setDescription('The books API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
