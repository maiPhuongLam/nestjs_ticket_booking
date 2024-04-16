import { BookingStatus, ShowSeat } from '@prisma/client';

export interface ICreateBookingBody {
  bookingNo: string;
  numberOfSeats: number;
  status: BookingStatus;
  customerId: number;
  showId: number;
  price: number
}
