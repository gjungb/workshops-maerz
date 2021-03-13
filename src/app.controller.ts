import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: this.appService.getHello() };
  }

  @Post('greeting')
  createGreeting(@Body('message') value: string): string {
    this.appService.sendMessage(value);
    return value;
  }
}
