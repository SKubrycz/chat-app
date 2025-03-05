import { Body, Controller, Get, Post, Res, UsePipes } from "@nestjs/common";
import { LoginService } from "./login.service";
import { UserLoginDto } from "./login.dto";
import { ValidLoginPipe } from "./login.pipe";
import { Response } from "express";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  getLogin() {
    return this.loginService.getLogin();
  }

  @Post()
  @UsePipes(ValidLoginPipe)
  async postLogin(@Res({passthrough: true}) res: Response, @Body() userLoginDto: UserLoginDto) {

    
    return this.loginService.postLogin(res, userLoginDto);
  }
}
