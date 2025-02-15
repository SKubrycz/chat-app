import { Injectable } from '@nestjs/common';

export interface Message {
  message: string;
}

@Injectable()
export class AppService {
  getHello(): Message {
    return { message: 'Hello world' };
  }
}
