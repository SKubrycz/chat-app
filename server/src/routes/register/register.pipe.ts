import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { UserRegisterDto } from "./register.dto";
import { plainToInstance } from "class-transformer";
import { CredentialsConstraints } from "src/credentialsConstraints";

@Injectable()
export class ValidRegisterPipe implements PipeTransform {
  transform(value: UserRegisterDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const { login, password, passwordAgain } = object;
    const constraints = new CredentialsConstraints();

    if (login.length < constraints.minLoginLength)
      throw new BadRequestException(
        `Username must be longer than ${constraints.minLoginLength - 1} characters`
      );
    if (password.length < constraints.minPasswordLength)
      throw new BadRequestException(
        `Password must be longer than ${constraints.minPasswordLength - 1} characters`
      );
    if (passwordAgain.length < constraints.minPasswordLength)
      throw new BadRequestException(
        `Repeated password must be longer than ${constraints.minPasswordLength - 1} characters`
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
