import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.mailer.env', isGlobal: true }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
