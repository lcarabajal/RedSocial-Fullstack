// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module.js';
// // import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   app.enableCors({
//       origin:true,
//       methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//       allowedHeaders: 'Content-Type, Accept, Authorization', //Habilita la comunicación al frontEnd
//       credentials: true,
//     } 
//   );
         
   

//   // app.useGlobalPipes(new ValidationPipe()); //Habilita el uso de validators en el back

//   await app.listen(process.env.PORT ?? 3000);
// }
// await bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
// import { ValidationPipe } from '@nestjs/common';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
      credentials: true,
    });

    // app.useGlobalPipes(new ValidationPipe());

    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

// Punto de entrada que necesita Vercel para responder cada request
export default async function handler(req: any, res: any) {
  try {
    const server = await bootstrapServer();
    return server(req, res);
  } catch (error: any) {
    console.error('Error en Vercel:', error);
    return res.status(500).json({
      message: 'Error al iniciar el servidor',
      error: error?.message || String(error),
    });
  }
}

// Solo levanta el puerto cuando corrés en tu PC (npm run start:dev)
if (!process.env.VERCEL) {
  bootstrapServer().then((server) => {
    const port = process.env.PORT ?? 3000;
    server.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  });
}
