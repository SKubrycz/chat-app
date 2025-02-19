import { Injectable } from "@nestjs/common";
import { UserRegisterDto } from "./register.dto";
import { Message } from "src/types/routes";

@Injectable()
export class RegisterService {
  postRegister(userRegisterDto: UserRegisterDto): Message {
    return { message: `Posted @ /register ${userRegisterDto.login}` };
  }
}
