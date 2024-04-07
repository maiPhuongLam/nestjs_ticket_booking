import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/modules/user/enums';

export const Roles = Reflector.createDecorator<UserRoles[]>();
