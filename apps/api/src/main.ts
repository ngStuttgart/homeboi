import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CustomHttpFilter } from './app/filter/custom-http.filter';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  app.useStaticAssets(join(__dirname, '..', 'homeboi'));
  app.useGlobalFilters(app.get(CustomHttpFilter));

  const options = new DocumentBuilder()
    .setTitle('HOMEBOI API')
    .setDescription('The homeboi api')
    .setVersion('0.1')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
