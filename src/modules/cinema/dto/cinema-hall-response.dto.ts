import { CinemaHall } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class CinemaHallResponseDto extends BaseDto {
  id: number;
  name: string;
  total_seats: number;
  @Exclude()
  total_rows: number;
  cinema_id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
