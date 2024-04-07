import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/modules/user/enums';
import { Roles } from '../decorators';
import { AdminRepository } from 'src/modules/user/repositories/admin.repository';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminRepository: AdminRepository,
  ) {}

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
    let role;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.admin) {
      role = UserRoles.ADMIN;
    } else if (user.customer) {
      role = UserRoles.ADMIN;
    } else {
      role = UserRoles.FRONT_DESK_OFFICER;
    }

    return roles.some((r) => r === role);
  }
}
