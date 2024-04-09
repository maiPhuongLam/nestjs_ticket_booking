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
  street_address: string;

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
  user_id?: number;

  @IsOptional()
  @IsInt()
  cinema_id?: number;
}
