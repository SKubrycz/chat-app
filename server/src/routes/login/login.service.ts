import { Injectable } from "@nestjs/common";
import type { Message } from "src/types/routes";

@Injectable()
export class LoginService {
  getLogin(): Message {
    return { message: "Hello from login" };
  }
}
