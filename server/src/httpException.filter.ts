import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const date = new Date().toISOString();

    console.error(
      "\x1b[31m",
      `[${date}] Exception: ${status} - ${exception.message}`,
      "\x1b[0m"
    );

    res.status(status).json({
      message: exception.message,
    });
  }
}
