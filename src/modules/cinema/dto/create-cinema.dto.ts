import { Address } from '@prisma/client';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto';

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  totalCinemaHalls: number;

  @IsNotEmpty()
  address: CreateAddressDto;
}
