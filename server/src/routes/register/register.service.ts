import { Injectable } from "@nestjs/common";
import { Message } from "src/types/routes";
import { IRegister } from "./register.interface";

@Injectable()
export class RegisterService {
  postRegister(register: IRegister): Message {
    return { message: `Posted @ /register ${register.login}` };
  }
}
