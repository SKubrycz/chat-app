import { Injectable } from "@nestjs/common";
import { Message } from "src/types/routes";

@Injectable()
export class ChatService {
  getMainChat(): Message {
    return { message: "From /chat" };
  }
}
