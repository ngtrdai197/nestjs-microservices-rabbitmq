import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { concatMap, finalize, Observable, tap, timeout } from 'rxjs';

import { AppService } from './app.service';
import { MAILER_SERVICE } from './common/constants/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject(MAILER_SERVICE) private readonly client: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): Observable<string> {
    return this.client.send({ cmd: 'hello' }, 'Dai Nguyen Dz').pipe(
      tap((response) => console.log('response :>> ', response)),
      concatMap((response) => this.appService.getHello(response)),
      timeout(5000),
      finalize(() => console.log('End!')),
    );
  }
}
