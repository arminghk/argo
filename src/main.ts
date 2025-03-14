import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    optionsSuccessStatus: 200, 
  });


  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1', 
  });
  app.use(morgan('dev'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
