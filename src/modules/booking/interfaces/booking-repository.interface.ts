import { Booking } from '@prisma/client';
import { ICreateBookingBody } from './create-booking.interface';

export interface IBookingRepository {
  create(data: ICreateBookingBody): Promise<Booking>;
}
