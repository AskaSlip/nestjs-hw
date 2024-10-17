import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swagger-helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Okten nest.js')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 7,
      persistAuthorization: true,
    },
  });

  const port = 3000;
  const host = 'localhost';
  await app.listen(3000, () => {
    console.log(`Server started on port http://${host}:${port}`);
    console.log(`Swagger started on port http://${host}:${port}/docs`);
  });
}
void bootstrap();
