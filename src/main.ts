import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin:[
      'http://localhost:4200',
      'https://red-social-brown.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  } 
         
  ); //Habilita la comunicación al frontEnd

  app.useGlobalPipes(new ValidationPipe()); //Habilita el uso de validators en el back

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
