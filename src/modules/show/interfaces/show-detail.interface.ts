import { Row } from '@prisma/client';

export interface IShowDetails {
  id: number;
  startTime: Date;
  endTime: Date;
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
