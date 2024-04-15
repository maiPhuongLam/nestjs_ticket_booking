import { CinemaHall, ShowSeat } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class ShowResponseDto extends BaseDto {
  id: number;
  startTime: Date;
  endTime: Date;
  @Exclude()
  adminId: number;
  cinemaHallId: number;
  movieId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  cinemaHall: CinemaHall;
  showSeats: ShowSeat[];
}
