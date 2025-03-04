import { Module } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginController } from "./login.controller";
import { User, UserSchema } from "src/common/schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
          name: User.name,
          useFactory: () => {
            const schema = UserSchema;
            schema.post("save", () => {
              console.log("UserSchema saved");
            })
            return schema;
          }
        }]),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
