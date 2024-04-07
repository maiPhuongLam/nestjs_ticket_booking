import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/modules/user/enums';
import { Roles } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRoles[]>(Roles, [
      context.getHandler(),
      context.getClass,
    ]);
    if (!roles || !roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.some((role) => role === user.role);
  }
}
