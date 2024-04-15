import { User } from '@prisma/client';

export interface IBaseUserRepository<T> {
  create(id: number): Promise<T>;
  findByUserId(id: number): Promise<T | null>;
}
