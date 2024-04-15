import { Movie } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class MovieResponseDto extends BaseDto {
  id: number;
  title: string;
  description: string;
  durationMin: number;
  thumbnailPublicId: string;
  thumbnailUrl: string;
  language: string;
  releaseDate: Date;
  country: string;
  genre: string;
  @Exclude()
  adminId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
