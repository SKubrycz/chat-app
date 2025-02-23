import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";
import { UserLoginDto } from "./login.dto";
import { plainToInstance } from "class-transformer";
import { CredentialsConstraints } from "src/credentialsConstraints";

export class ValidLoginPipe implements PipeTransform {
  transform(value: UserLoginDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const { login, password } = object;
    const constraints = new CredentialsConstraints();
    if (login.length < constraints.minLoginLength)
      throw new BadRequestException(
        "Username must be longer than 3 characters"
      );
    if (password.length < constraints.minPasswordLength)
      throw new BadRequestException(
        "Password must be longer than 7 characters"
      );

    return value;
  }

  toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
