import { Body, Controller, Post } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { UserRegisterDto } from "./register.dto";

@Controller("register")
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  postRegister(@Body() userRegisterDto: UserRegisterDto) {
    return this.registerService.postRegister(userRegisterDto);
  }
}
