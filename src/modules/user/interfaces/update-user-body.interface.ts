import { UserStatus } from '@prisma/client';
import { ICreateUserBody } from './creat-user-body.interface';

export interface IUpdateUserBody extends Partial<ICreateUserBody> {
  status?: UserStatus;
}
