import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { UserRegisterDto } from "./register.dto";
import { ValidRegisterPipe } from "./register.pipe";

@Controller("register")
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @UsePipes(ValidRegisterPipe)
  async postRegister(@Body() userRegisterDto: UserRegisterDto) {
    return this.registerService.postRegister(userRegisterDto);
  }
}
