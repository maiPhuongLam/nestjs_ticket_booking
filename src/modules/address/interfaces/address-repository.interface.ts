import { Address, Prisma } from '@prisma/client';
import { CreateAddressBody, UpdateAddressBody } from '../interfaces';

export interface IAddressRepository {
  findAll(): Promise<Address[]>;
  findById(id: number): Promise<Address | null>;
  create(data: CreateAddressBody): Promise<Address>;
  update(id: number, data: UpdateAddressBody): Promise<Address | null>;
  delete(id: number): Promise<Address | null>;
}
