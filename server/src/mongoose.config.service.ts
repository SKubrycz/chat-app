import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions {
        const uri = this.configService.get<string>("DB_URL");
        
        return {
            uri: uri,
            onConnectionCreate: (connection: Connection) => {
                connection.on("connected", () => console.log("\x1b[92m\x1b[1m" + "[MongoDB] => connected" + "\x1b[0m"))
                return connection;
            }
        }
    }    
}