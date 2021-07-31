import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  getHello(data: string): string {
    return `[${data}] - Hello Mailer!`;
  }
}
