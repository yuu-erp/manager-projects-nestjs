import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '@/config/configuration.type';
@Injectable()
export class ConfigurationService implements ConfigurationType {
  constructor(private configService: ConfigService<ConfigurationType, true>) {}
  get nodeEnv(): string {
    return this.configService.get('nodeEnv');
  }
  get port(): number {
    return this.configService.get('port');
  }
}
