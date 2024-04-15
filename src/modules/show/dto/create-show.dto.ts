import { IsInt, IsNotEmpty } from 'class-validator';
import { ICreateShowBody } from '../interfaces';

export class CreateShowDto {
  @IsNotEmpty()
  startTime: Date;

  @IsNotEmpty()
  endTime: Date;

  @IsNotEmpty()
  @IsInt()
  cinemaHallId: number;

  @IsNotEmpty()
  @IsInt()
  movieId: number;

  @IsInt()
  price: number;
}
