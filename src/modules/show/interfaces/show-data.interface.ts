import { Seat, SeatType } from '@prisma/client';

export interface IShowData {
  id: number;
  startTime: Date;
  endTime: Date;
  adminId: number;
  cinemaHallId: number;
  movieId: number;
  createdAt: Date;
  updatedAt: Date;

  cinemaHall: {
    rows: {
      id: number;
      rowNum: number;
      totalSeats: number;
      cinemaHallId: number;
      seats: Seat[];
    }[];
  };
}
