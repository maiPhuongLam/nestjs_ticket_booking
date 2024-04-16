import { ShowSeat } from '@prisma/client';
import { ICreateShowSeatBody } from './create-show-seat-body.interface';

export interface IShowSeatRepository {
  findById(id: number): Promise<ShowSeat>
  create(data: ICreateShowSeatBody): Promise<ShowSeat>;
  update(id: number, data: Partial<ICreateShowSeatBody>): Promise<ShowSeat>;
}
