import { ConfigurationType } from '@/config/configuration.type';

export const configuration = (): ConfigurationType => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
});
