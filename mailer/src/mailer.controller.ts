import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailerService } from './mailer.service';

@Controller()
export class MailerController {
  private readonly logger = new Logger(MailerController.name);
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello(@Payload() data: string): string {
    this.logger.debug(JSON.stringify(data));
    return this.mailerService.getHello(data);
  }
}
