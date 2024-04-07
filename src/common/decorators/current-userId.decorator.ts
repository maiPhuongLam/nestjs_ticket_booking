import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/modules/auth/interfaces';

export const CurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.user as JwtPayload;
    return user.sub;
  },
);
