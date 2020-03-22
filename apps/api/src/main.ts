import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CustomHttpFilter } from './app/filter/custom-http.filter';
import { authenticationMiddleware } from './app/shared/authentication.middleware';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { forceSSLMiddleware } from './app/shared/force-ssl.middleware';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  app.useStaticAssets(join(__dirname, '..', 'homeboi'));
  app.useGlobalFilters(app.get(CustomHttpFilter));
  app.use(cookieParser());
  app.use(authenticationMiddleware);
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser({ limit: '50M' }));
  // Force SSL redirect in Heroku
  app.use(forceSSLMiddleware);
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
