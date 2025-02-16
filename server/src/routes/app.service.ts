import { Injectable } from "@nestjs/common";
import type { Message } from "src/types/routes";

@Injectable()
export class AppService {
  getHello(): Message {
    return { message: "Hello world" };
  }
}
