import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { LoggerService } from './logger.service';

@Injectable()
export class MorganLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: any, res: any, next: () => void) {
    morgan('combined', {
      stream: {
        write: (message: string) => this.logger.log(message),
      },
    })(req, res, next);
  }
}
