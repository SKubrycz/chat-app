import { Injectable } from "@nestjs/common";
import type { Message } from "src/types/routes";
import { ILogin } from "./login.interface";

@Injectable()
export class LoginService {
  getLogin(): Message {
    return { message: "Hello from login" };
  }
  postLogin(login: ILogin): Message {
    return {
      message: `Posted @ /login: ${login.login}, ${login.password}`,
    };
  }
}
