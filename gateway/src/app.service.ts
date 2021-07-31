import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(v: string): Promise<string> {
    return Promise.resolve('Gateway -> AppService' + '->' + v);
  }
}
