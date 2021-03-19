import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Post } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('posts')
  getPosts(): Promise<Post[]> {
    const res = this.prisma.post.findMany();
    return res;
  }
}
