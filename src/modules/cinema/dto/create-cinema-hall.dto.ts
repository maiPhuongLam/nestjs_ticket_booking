import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ICreateCinemaHallBody } from '../interfaces';
import { Transform, Type } from 'class-transformer';
import { BadGatewayException } from '@nestjs/common';

export class CreateCinemaHallDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  totalSeats: number;

  @IsNotEmpty()
  @IsInt()
  totalRows: number;

  @Transform(({ value, obj }) => {
    console.log(value.length);
    console.log(obj);

    if (value.length !== obj.totalRows) {
      throw new BadGatewayException('invalid row or numSeatsPerRow');
    }
    const seats = value.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    if (seats !== obj.totalSeats) {
      throw new BadGatewayException('invalid seats or numSeatsPerRow');
    }
    return value;
  })
  @ArrayMinSize(1, { message: 'At least one row should have seats' })
  @Type(() => Number)
  numSeatsPerRow: number[];
}
