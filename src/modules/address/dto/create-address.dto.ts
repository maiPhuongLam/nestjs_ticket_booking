import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsInt,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 10)
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  cinemaId?: number;
}
