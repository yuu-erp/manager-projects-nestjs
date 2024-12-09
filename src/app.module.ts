import { Module } from '@nestjs/common';
import { PrismaModule } from '@/service/prismaService/prisma.module';
import { ConfigurationModule } from '@/config/configuration.module';

@Module({
  imports: [ConfigurationModule,PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
