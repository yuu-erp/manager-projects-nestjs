import { uuidGenerator } from '@/package/uuidGenerator'
import { LoggerService } from '@/service/loggerService/logger.service'
import { NextFunction, Request, Response } from 'express'

export const correlationMiddleware = (logger: LoggerService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['correlationId']) {
      const correlationId = uuidGenerator()
      req.headers['correlationId'] = correlationId
      res.setHeader('correlationId', correlationId)
      logger.correlationId = correlationId
    }
    next()
  }
}
