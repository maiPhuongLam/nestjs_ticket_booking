import { Booking } from '@prisma/client';
import { ICreateBookingBody } from './create-booking.interface';

export interface IBookingRepository {
  create(data: ICreateBookingBody): Promise<Booking>;
  findById(id: number): Promise<Booking>;
  find(): Promise<Booking[]>;
  createWithTransaction(data: ICreateBookingBody): Promise<Booking>
}
