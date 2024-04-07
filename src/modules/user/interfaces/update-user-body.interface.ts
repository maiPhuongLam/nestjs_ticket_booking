import { UserStatus } from '@prisma/client';
import { CreateUserBody } from './creat-user-body.interface';

export interface UpdateUserBody extends Partial<CreateUserBody> {
  status?: UserStatus;
}
