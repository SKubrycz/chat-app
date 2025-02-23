import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { LoginService } from "./login.service";
import type { Message } from "src/types/routes";
import { UserLoginDto } from "./login.dto";
import { ValidLoginPipe } from "./login.pipe";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  getLogin(): Message {
    return this.loginService.getLogin();
  }

  @Post()
  @UsePipes(ValidLoginPipe)
  async postLogin(@Body() userLoginDto: UserLoginDto) {
    return this.loginService.postLogin(userLoginDto);
  }
}
