import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigurationService } from '@/config/configuration.service'
import { VersioningType } from '@nestjs/common'
import { LoggerService } from '@/service/loggerService/logger.service'
import { correlationMiddleware } from '@/middlewares/correlation.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const loggerService = await app.resolve(LoggerService)
  app.use(correlationMiddleware(loggerService))

  app.enableCors({
    origin: '*',
    exposedHeaders: ['Authorization', 'refresh_token', 'correlationId'],
    methods: 'GET, PUT, POST, DELETE, UPDATE, OPTIONS, PATCH',
    credentials: true
  })

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI
  })

  const configurationService = app.get(ConfigurationService)
  await app.listen(configurationService.port)
}
bootstrap()
