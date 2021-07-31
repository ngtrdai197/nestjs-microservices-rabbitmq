import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MAILER_SERVICE } from './common/constants/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.gateway.env', isGlobal: true }),
    ClientsModule.register([
      {
        name: MAILER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [`amqps://admin:admin@localhost:5672`],
          queue: 'QUEUE_MAILER',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
