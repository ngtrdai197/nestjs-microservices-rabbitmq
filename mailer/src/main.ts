import { INestMicroservice, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { MailerModule } from './mailer.module';

async function bootstrap() {
  const app = await NestFactory.create(MailerModule);
  const configService = app.get(ConfigService);

  const user = configService.get<string>('RABBITMQ_USER');
  const password = configService.get<string>('RABBITMQ_PASSWORD');
  const host = configService.get<number>('RABBITMQ_MAILER_HOST');
  const queueName = configService.get<string>('RABBITMQ_QUEUE_MAILER');

  const connectMicroservice: INestMicroservice =
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [`amqps://${user}:${password}@${host}`],
        queue: queueName,
        queueOptions: {
          durable: false,
        },
      },
    });
  await Promise.resolve(connectMicroservice);
  app
    .startAllMicroservices()
    .then(() =>
      Logger.debug('Microservice starting ...', 'Mailer Microservice'),
    );
}
bootstrap();
