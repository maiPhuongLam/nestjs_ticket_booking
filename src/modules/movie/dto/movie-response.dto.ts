import { Movie } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class MovieResponseDto extends BaseDto {
  id: number;
  title: string;
  description: string;
  duration_min: number;
  thumbnail_public_id: string;
  thumbnail_url: string;
  language: string;
  release_date: Date;
  country: string;
  genre: string;
  @Exclude()
  admin_id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
