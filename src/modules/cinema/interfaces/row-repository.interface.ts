import { Row } from '@prisma/client';

export interface IRowRepository {
  findOne(filter: Record<string, any>): Promise<Row>;
  countRowByHallId(hallId: number): Promise<number>;
  getRowsOfHall(hallId: number): Promise<Row[]>;
  create(data: {
    totalSeats: number;
    cinemaHallId: number;
    rowNum: number;
  }): Promise<Row>;
  findById(id: number): Promise<Row>;
}
