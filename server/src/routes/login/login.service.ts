import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type { Message } from "src/types/routes";
import { ILogin } from "./login.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/common/schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {

  }

  getLogin(): Message {
    return { message: "Hello from login" };
  }

  async postLogin(login: ILogin): Promise<Message> {
    const existingUser: User | null = await this.userModel.findOne({ login: login.login });
    if (!existingUser) throw new NotFoundException("User does not exist");

    const comparison = await bcrypt.compare(login.password, existingUser.password)
    if (!comparison) throw new BadRequestException("Invalid input data")

    return {
      message: `Posted @ /login: ${login.login}, ${login.password}`,
    };
  }
}
