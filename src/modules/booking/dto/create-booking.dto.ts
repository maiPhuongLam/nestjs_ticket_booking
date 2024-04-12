export class CreateBookingDto {
  booking_no: string;
  number_of_seats: number;
  show_seat: {
    seat_number: number;
    isReserved: boolean;
    price: number;
  }[];
}
