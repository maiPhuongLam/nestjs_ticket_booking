import { $Enums, SeatType } from '@prisma/client';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSeatDto {
  @IsNotEmpty()
  @IsInt()
  seat_row: number;

  @IsNotEmpty()
  @IsInt()
  seat_col: number;

  @IsNotEmpty()
  type: SeatType;
}
