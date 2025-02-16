import { NestFactory } from "@nestjs/core";
import { AppModule } from "./routes/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CLIENT ?? "http://localhost:5173" });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
