import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import { ChatModule } from "./chat/chat.module";
import { ConfigModule} from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "src/mongoose.config.service";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    LoginModule,
    RegisterModule,
    ChatModule,
  ],
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
