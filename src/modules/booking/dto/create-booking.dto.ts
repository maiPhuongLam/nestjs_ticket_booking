export class CreateBookingDto {
  bookingNo: string;
  numberOfSeats: number;
  showSeat: {
    seatNumber: number;
    isReserved: boolean;
    price: number;
  }[];
}
