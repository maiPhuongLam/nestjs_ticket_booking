import { Seat, SeatType } from '@prisma/client';

export interface ShowData {
  id: number;
  start_time: Date;
  end_time: Date;
  admin_id: number;
  cinema_hall_id: number;
  movie_id: number;
  created_at: Date;
  updated_at: Date;

  cinema_hall: {
    rows: {
      id: number;
      row_num: number;
      total_seats: number;
      cinema_hall_id: number;
      seats: Seat[];
    }[];
  };
}
