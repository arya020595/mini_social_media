import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'http',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        winston.format.json(),
        winston.format.colorize({ all: true }),
      ),
      transports: [new winston.transports.Console()],
      exceptionHandlers: [
        new winston.transports.File({ filename: 'exception.log' }),
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: 'rejections.log' }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string, trace: string) {
    this.logger.warn(message, trace);
  }
}
