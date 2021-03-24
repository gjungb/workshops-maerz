import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): Observable<boolean> {
    const host = context.switchToHttp();

    const req = host.getRequest<Request>();

    const userId = req.header('X-UserId');

    console.log(userId);

    const isAllowed = userId === '1701';

    return of(isAllowed);
  }
}
