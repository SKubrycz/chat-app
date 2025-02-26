import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from "src/httpException.filter";
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [LoginModule, RegisterModule, ChatModule],
  controllers: [AppController, ChatController],
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
