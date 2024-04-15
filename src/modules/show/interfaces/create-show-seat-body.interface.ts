export interface ICreateShowSeatBody {
  seatNumber: string;
  isReserved: boolean;
  price: number;
  bookingId?: number;
  showId: number;
  cinemaHallSeatId: number;
}
