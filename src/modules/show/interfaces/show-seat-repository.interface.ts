import { ShowSeat } from '@prisma/client';
import { ICreateShowSeatBody } from './create-show-seat-body.interface';

export interface IShowSeatRepository {
  create(data: ICreateShowSeatBody): Promise<ShowSeat>;
  update(id: number, data: Partial<ICreateShowSeatBody>): Promise<ShowSeat>;
}
