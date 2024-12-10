/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConsoleLogger, Injectable } from '@nestjs/common'
import { Logger, createLogger, format, transports } from 'winston'

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logger: Logger

  constructor() {
    super()
    this.logger = this.initializeLogger()
  }

  private initializeLogger(): Logger {
    const { combine, timestamp, colorize, printf } = format

    const customFormat = printf(
      ({ level, timestamp, message, correlationId = '', ...metadata }) => {
        const additionalData = this.formatMetadata(metadata)
        const baseLog = `[${timestamp}] [${level.toUpperCase()}]`

        if (correlationId) {
          return `${baseLog} [${correlationId}] ${message} ${additionalData}`
        }

        return `${baseLog} ${message} ${additionalData}`
      }
    )

    return createLogger({
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      ),
      transports: [
        new transports.Console({
          level: 'debug',
          format: colorize({ all: true })
        }),
        new transports.File({
          filename: 'public/logs/rtc_logs.log',
          level: 'debug',
          format: colorize({ all: true })
        })
      ]
    })
  }

  private formatMetadata(metadata: Record<string, any>): string {
    const splatSymbol = Symbol.for('splat')
    const splatData = Object.getOwnPropertySymbols(metadata).includes(
      splatSymbol
    )
      ? metadata[splatSymbol as any]
      : []
    return splatData
      .map((item: any) => JSON.stringify(item, null, 2))
      .join('\n')
  }

  set correlationId(correlationId: string) {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      correlationId
    }
  }

  get correlationId(): string {
    return this.logger.defaultMeta?.correlationId ?? ''
  }

  log(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta)
  }

  warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, ...meta)
  }

  error(message: string, ...meta: any[]): void {
    this.logger.error(message, ...meta)
  }

  debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta)
  }
}
