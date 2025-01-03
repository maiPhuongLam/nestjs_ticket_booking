import { CinemaHall, Movie, ShowSeat } from '@prisma/client';
import { Exclude, ClassTransformer } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class ShowResponseDto extends BaseDto {
  id: number;
  startTime: Date;
  endTime: Date;
  @Exclude()
  adminId: number;
  @Exclude()
  movieId: number;
  @Exclude()
  cinemaHallId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  cinemaHall: {
    id: number;
    name: string;
    rows: {
      id: number;
      seats: {
        id: number;
        seatRow: number;
        seatCol: number;
      }[];
    }[];
    cinema: {
      id: number;
      name: string;
      address: {
        id: number;
        streetAddress: string;
        state: string;
        zipcode: string;
        country: string;
      };
    };
  };
  showSeats: {
    id: number;
    seatNumber: string;
    isReserved: boolean;
    price: number;
    bookingId: number | null;
  }[];
  movie: {
    id: number;
    title: string;
    description: string;
    durationMin: number;
    language: string;
    thumbnailPublicId: string | null;
    thumbnailUrl: string;
    releaseDate: Date;
    country: string;
    genre: string;
  };
}
