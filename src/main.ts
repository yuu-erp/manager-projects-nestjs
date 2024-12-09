import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationService } from '@/config/configuration.service';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configurationService = app.get(ConfigurationService);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(configurationService.port);
}
bootstrap();
