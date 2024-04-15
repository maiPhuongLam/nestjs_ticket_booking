import { User } from '@prisma/client';
import { ICreateUserBody, IUpdateUserBody } from '../interfaces';

export interface IUserRepository {
  find(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(data: ICreateUserBody): Promise<User | null>;
  update(id: number, data: IUpdateUserBody): Promise<User>;
  delete(id: number): Promise<User>;
}
