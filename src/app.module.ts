import { ConfigurationModule } from '@/config/configuration.module'
import { PrismaModule } from '@/service/prismaService/prisma.module'
import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { LoggerModule } from './service/loggerService/logger.module'
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigurationModule, LoggerModule, PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
