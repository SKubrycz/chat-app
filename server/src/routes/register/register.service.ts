import { BadRequestException, Injectable } from "@nestjs/common";
import { Message } from "src/types/routes";
import { IRegister } from "./register.interface";

@Injectable()
export class RegisterService {
  postRegister(register: IRegister): Message {
    const { login, email, password, passwordAgain } = register;

    if (login.length < 3)
      throw new BadRequestException(
        "Username must be longer than 3 characters"
      );
    if (password.length < 8)
      throw new BadRequestException(
        "Password must be longer than 7 characters"
      );
    if (passwordAgain.length < 8)
      throw new BadRequestException(
        "Repeated password must be longer than 7 characters"
      );
    if (password !== passwordAgain)
      throw new BadRequestException("Passwords are not the same");

    return { message: `Posted @ /register ${register.login}` };
  }
}
