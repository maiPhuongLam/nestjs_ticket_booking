import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from 'src/modules/auth/interfaces';
export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    console.log(data);
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);