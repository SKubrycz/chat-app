import { NestFactory } from "@nestjs/core";
import { AppModule } from "./routes/app.module";
import { log } from "./middlewares/log.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(log);
  app.enableCors({ origin: process.env.CLIENT ?? "http://localhost:5173" });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
