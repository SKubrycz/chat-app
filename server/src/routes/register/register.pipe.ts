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
  PASSWORD_REGEX,
} from "src/credentials-constraints";

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
      if (!password.match(PASSWORD_REGEX))
        throw new BadRequestException(`Password does not meet requirements`);
    if (passwordAgain.length < MIN_PASSWORD_LENGTH)
      throw new BadRequestException(
        `Repeated password must be longer than ${MIN_PASSWORD_LENGTH - 1} characters`
      );
    if (!passwordAgain.match(PASSWORD_REGEX))
        throw new BadRequestException(`Password does not meet requirements`);
    if (password !== passwordAgain)
      throw new BadRequestException("Passwords are not the same");

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
