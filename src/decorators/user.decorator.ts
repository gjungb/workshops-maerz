import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface UserData {
  id: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const host = ctx.switchToHttp();

    const req = host.getRequest<Request & { user: UserData }>();

    const user = req.user;

    return user;
  },
);
