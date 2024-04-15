import { CinemaHall } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class CinemaHallResponseDto extends BaseDto {
  id: number;
  name: string;
  totalSeats: number;
  @Exclude()
  totalRows: number;
  cinemaId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
