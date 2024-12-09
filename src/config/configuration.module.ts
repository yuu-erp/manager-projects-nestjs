import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '@/config/configuration';
import { ConfigurationService } from '@/config/configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [ConfigurationService, ConfigService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
