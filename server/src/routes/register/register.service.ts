import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Message } from "src/types/routes";
import { IRegister } from "./register.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/common/schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { EmailService } from "../email/email.service";

@Injectable()
export class RegisterService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private emailService: EmailService ) {}

  async postRegister(register: IRegister): Promise<Message> {
    const existingUser =  await this.userModel.findOne({ $or: [ {login: register.login }, {email: register.email } ] });
    if (existingUser) throw new BadRequestException("User already exists");

    const mail = await this.emailService.send({from: "auth.localhost", to: register.email, subject: "Email verification", html: "<b>Verify email</b>"})
    if (!mail) throw new InternalServerErrorException("Could not finish form submission")

    const hash = await bcrypt.hash(register.password, 10)
    const saveRegister: IRegister = {
      login: register.login,
      email: register.email,
      password: hash,
      passwordAgain: hash,
    }

    const createdUser = new this.userModel(saveRegister);
    createdUser.save();

    return { message: `Posted @ /register ${register.login}` };
  }
}
