import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { UserRegisterDto } from "./register.dto";
import { plainToInstance } from "class-transformer";
import {
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "src/credentialsConstraints";

@Injectable()
export class ValidRegisterPipe implements PipeTransform {
  transform(value: UserRegisterDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const { login, password, passwordAgain } = object;

    if (login.length < MIN_LOGIN_LENGTH)
      throw new BadRequestException(
        `Username must be longer than ${MIN_LOGIN_LENGTH - 1} characters`
      );
    if (password.length < MIN_PASSWORD_LENGTH)
      throw new BadRequestException(
        `Password must be longer than ${MIN_PASSWORD_LENGTH - 1} characters`
      );
    if (passwordAgain.length < MIN_PASSWORD_LENGTH)
      throw new BadRequestException(
        `Repeated password must be longer than ${MIN_PASSWORD_LENGTH - 1} characters`
      );
    if (password !== passwordAgain)
      throw new BadRequestException("Passwords are not the same");

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
