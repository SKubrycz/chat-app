import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
  @IsString()
  login: string;

  @IsEmail({}, {message: "Invalid email"})
  email: string;

  @IsString()
  password: string;

  @IsString()
  passwordAgain: string;
}
