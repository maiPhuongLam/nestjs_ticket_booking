export interface CreateShowSeatBody {
  seat_number: string;
  is_reserved: boolean;
  price: number;
  booking_id?: number;
  show_id: number;
  cinema_hall_seat_id: number;
}
