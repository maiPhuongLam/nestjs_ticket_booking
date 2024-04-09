import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CreateCinemaHallBody } from '../interfaces';
import { Transform, Type } from 'class-transformer';
import { BadGatewayException } from '@nestjs/common';

export class CreateCinemaHallDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  total_seats: number;

  @IsNotEmpty()
  @IsInt()
  total_rows: number;

  @Transform(({ value, obj }) => {
    if (value.length !== obj.total_rows) {
      throw new BadGatewayException('invalid row or num_seats_per_row');
    }
    const seats = value.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    if (seats !== obj.total_seats) {
      throw new BadGatewayException('invalid seats or num_seats_per_row');
    }
    return value;
  })
  @ArrayMinSize(1, { message: 'At least one row should have seats' })
  @Type(() => Number)
  num_seats_per_row: number[];
}
