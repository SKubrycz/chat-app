import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from "src/httpException.filter";

@Module({
  imports: [LoginModule, RegisterModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
