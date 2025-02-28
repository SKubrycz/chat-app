import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const uri = this.configService.get<string>("DB_URL");
    console.log("\x1b[92m\x1b[1m" + "[MongoDB] => connecting" + "\x1b[0m");

    return {
      type: "mongodb",
      url: uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
      retryAttempts: 5,
      retryDelay: 1500,
    };
  }
}
