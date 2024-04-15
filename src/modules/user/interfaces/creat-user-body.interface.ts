import { Address, User, UserStatus } from '@prisma/client';

export interface ICreateUserBody {
  name: string;
  email: string;
  password: string;
  phone: string;
  addressId?: never;
  rt?: string;
}
