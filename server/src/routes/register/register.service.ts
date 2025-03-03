import { Injectable } from "@nestjs/common";
import { Message } from "src/types/routes";
import { IRegister } from "./register.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/common/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class RegisterService {
  constructor(@InjectModel(User.name) private userModel: Model<User> ) {}

  async postRegister(register: IRegister): Promise<Message> {
    const createdUser = new this.userModel(register);
    createdUser.save();

    return { message: `Posted @ /register ${register.login}` };
  }
}
