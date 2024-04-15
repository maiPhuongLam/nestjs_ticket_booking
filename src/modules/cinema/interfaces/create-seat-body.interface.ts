import { SeatType } from '@prisma/client';

export interface ICreateSeatBody {
  seatRow: number;
  seatCol: number;
  type: SeatType;
  rowId: number;
}
