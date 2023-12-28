import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response, request } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    const statusCode = determineStatusCode(exception.code);

    response.status(statusCode).json({
      statusCode,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

function determineStatusCode(code: string): number {
  switch (code) {
    case 'P2002':
      return 409;
    case 'P2025':
      return HttpStatus.NOT_FOUND;
    default:
      return 500;
  }
}
