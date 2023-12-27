import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });

    next();
  }
}
