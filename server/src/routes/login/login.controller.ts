import { Controller, Get } from "@nestjs/common";
import { LoginService } from "./login.service";
import type { Message } from "src/types/routes";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  getLogin(): Message {
    return this.loginService.getLogin();
  }
}
