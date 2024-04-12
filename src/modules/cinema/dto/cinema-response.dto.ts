import { Cinema } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class CinemaResponseDto extends BaseDto {
  id: number;
  name: string;
  total_cinema_hall: number;
  address_id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
