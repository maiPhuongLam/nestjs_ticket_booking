import { $Enums, SeatType } from '@prisma/client';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSeatDto {
  @IsNotEmpty()
  @IsInt()
  seatRow: number;

  @IsNotEmpty()
  @IsInt()
  seatCol: number;

  @IsNotEmpty()
  type: SeatType;
}
