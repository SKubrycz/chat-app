import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import type { Message } from "src/types/routes";
import { UserLoginDto } from "./login.dto";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  getLogin(): Message {
    return this.loginService.getLogin();
  }

  @Post()
  postLogin(@Body() userLoginDto: UserLoginDto): Message {
    return this.loginService.postLogin(userLoginDto);
  }
}
