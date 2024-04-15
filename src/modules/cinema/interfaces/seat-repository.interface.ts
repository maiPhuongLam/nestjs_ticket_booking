import { Seat } from '@prisma/client';
import { ICreateSeatBody } from './create-seat-body.interface';

export interface ISeatRepository {
  create(data: ICreateSeatBody): Promise<Seat>;
  findById(id: number): Promise<Seat>;
  findByHallId(rowId: number): Promise<Seat[]>;
  update(id: number, data: Partial<ICreateSeatBody>): Promise<Seat>;
  delete(id: number): Promise<Seat>;
}
