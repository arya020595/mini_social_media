import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    const logsDirectory = path.join(__dirname, 'logs');
    fs.ensureDirSync(logsDirectory);

    const exceptionLogPath = path.join(logsDirectory, 'exception.log');
    const rejectionLogPath = path.join(logsDirectory, 'rejection.log');

    this.logger = winston.createLogger({
      level: 'http',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
          level: 'error',
          filename: exceptionLogPath,
          handleExceptions: true,
        }),
        new DailyRotateFile({
          filename: exceptionLogPath,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: exceptionLogPath }),
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: rejectionLogPath }),
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
