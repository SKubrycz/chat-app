import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schemas/user.schema';

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
    }])
  ],
  providers: [RegisterService],
  controllers: [RegisterController]
})
export class RegisterModule {}
