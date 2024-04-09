import { SeatType } from '@prisma/client';

export interface CreateSeatBody {
  seat_row: number;
  seat_col: number;
  type: SeatType;
  row_id: number;
}
