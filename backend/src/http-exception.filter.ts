import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof PrismaClientKnownRequestError) {
      // Handle Prisma errors
      status = determineStatusCode(exception.code);
      message = exception.message.replace(/\n/g, '') || 'Prisma Error';
    } else if (exception.status) {
      // Handle HTTP-related errors
      status = exception.status;
      message = exception.message || 'Unknown Error';
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      status,
    });
  }
}

const determineStatusCode = (code: string): number => {
  switch (code) {
    case 'P2002':
      return 409;
    case 'P2025':
      return HttpStatus.NOT_FOUND;
    default:
      return 500;
  }
};
