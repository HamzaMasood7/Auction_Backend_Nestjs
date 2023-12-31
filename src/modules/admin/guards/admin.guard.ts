import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserType } from 'src/modules/user/constants/user';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.user.type === UserType.ADMIN;
  }
}
