import { Injectable } from "@nestjs/common";
import type { Message } from "src/types/routes";
import { UserLoginDto } from "./login.dto";

@Injectable()
export class LoginService {
  getLogin(): Message {
    return { message: "Hello from login" };
  }
  postLogin(userLoginDto: UserLoginDto): Message {
    return {
      message: `Posted @ /login: ${userLoginDto.login}, ${userLoginDto.password}`,
    };
  }
}
