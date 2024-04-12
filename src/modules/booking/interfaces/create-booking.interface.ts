import { BookingStatus } from '@prisma/client';

export interface CreateBookingBody {
  booking_no: string;
  number_of_seats: number;
  status: BookingStatus;
  customer_id: number;
  show_id: number;
}
