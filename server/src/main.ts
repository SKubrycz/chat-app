import { NestFactory } from "@nestjs/core";
import { AppModule } from "./routes/app.module";
import { log } from "./common/middleware/log.middleware";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(log);
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  const client = configService.get("CLIENT");
  const port = configService.get("PORT");
  app.enableCors({ origin: client ?? "http://localhost:5173" });
  await app.listen(port ?? 4000);
}
bootstrap();
