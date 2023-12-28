import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { LoggerService } from './logger.service';

@Injectable()
export class MorganLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: any, res: any, next: () => void) {
    morgan(
      (tokens: any, req: any, res: any) => {
        return JSON.stringify({
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: Number.parseFloat(tokens.status(req, res)),
          content_length: tokens.res(req, res, 'content-length'),
          response_time: Number.parseFloat(tokens['response-time'](req, res)),
        });
      },
      {
        stream: {
          write: (message: string) => {
            const data = JSON.parse(message);
            this.logger.log(data);
          },
        },
      },
    )(req, res, next);
  }
}
