import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateShowBody } from '../interfaces';

export class CreateShowDto {
  @IsNotEmpty()
  start_time: Date;

  @IsNotEmpty()
  end_time: Date;

  @IsNotEmpty()
  @IsInt()
  cinema_hall_id: number;

  @IsNotEmpty()
  @IsInt()
  movie_id: number;

  @IsInt()
  price: number;
}
