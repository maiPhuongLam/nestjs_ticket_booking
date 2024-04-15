import { Cinema } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class CinemaResponseDto extends BaseDto {
  id: number;
  name: string;
  totalCinemaHalls: number;
  addressId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
