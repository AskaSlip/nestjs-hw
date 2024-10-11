import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hey')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('he')
  getHello2(): string {
    return this.appService.getHello();
  }
}
