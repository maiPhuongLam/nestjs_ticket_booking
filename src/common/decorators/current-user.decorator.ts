import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from 'src/modules/auth/interfaces';
export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);

    if (!data) return request.user;
    return request.user[data];
  },
);
