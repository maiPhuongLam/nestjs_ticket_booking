import { IsArray, IsNotEmpty } from 'class-validator';

export class SetSeatTypeDto {
  @IsNotEmpty()
  @IsArray()
  isRegular: number[];

  @IsNotEmpty()
  @IsArray()
  isdPremium: number[];

  @IsNotEmpty()
  @IsArray()
  isAccessible: number[];

  @IsNotEmpty()
  @IsArray()
  isEmergencyexit: number[];

  @IsNotEmpty()
  @IsArray()
  isOther: number[];
}
