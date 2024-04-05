import { Address, User, UserStatus } from '@prisma/client';

export interface CreateUserBody {
  name: string;
  email: string;
  password: string;
  phone: string;
  status: UserStatus;
  address_id?: never;
  rt?: string;
}

export interface UpdateUserBody extends Partial<CreateUserBody> {}
