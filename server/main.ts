import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Logger } from '@nestjs/common';

import * as compression from 'compression';

enableProdMode();

const port = +(process.env.port || 4000);

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(compression());
  app.setGlobalPrefix('api');
  await app.listenAsync(port);
  app.get(Logger).log(`App is listening on port ${port}`);
}

bootstrap();
