import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";
import { UserLoginDto } from "./login.dto";
import { plainToInstance } from "class-transformer";
import {
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "src/credentialsConstraints";

export class ValidLoginPipe implements PipeTransform {
  transform(value: UserLoginDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const { login, password } = object;
    if (login.length < MIN_LOGIN_LENGTH)
      throw new BadRequestException(
        `Username must be longer than ${MIN_LOGIN_LENGTH - 1} characters`
      );
    if (password.length < MIN_PASSWORD_LENGTH)
      throw new BadRequestException(
        `Password must be longer than ${MIN_PASSWORD_LENGTH - 1} characters`
      );

    return value;
  }

  toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
