import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import type { Message } from "src/types/routes";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Message {
    return this.appService.getHello();
  }
}
