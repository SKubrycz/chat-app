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
    const exceptionResponse = exception.getResponse();
    const date = new Date().toISOString();

    console.error(
      "\x1b[31m",
      `[${date}] Exception: ${status} - ${exception.message}`,
      "\x1b[0m"
    );

    if (typeof exceptionResponse === "object" && "message" in exceptionResponse) {
      if (Array.isArray(exceptionResponse?.message)) {
        res.status(status).json({
          message: exceptionResponse.message[0]
        });
      } else {
        res.status(status).json({
          message: exceptionResponse.message,
        });
      }
    } else {
      res.status(status).json({
        message: exception
      });
    }
    
    
  }
}
