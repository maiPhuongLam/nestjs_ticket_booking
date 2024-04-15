import { CinemaHall } from '@prisma/client';
import { ICreateCinemaHallBody } from './create-cinema-hall-body.interface';
import { IUpdateCinemaHallBody } from './uppdate-cinema-hall-body.interface';

export interface ICinemaHallRepository {
  countCinemaByCinemaId(cinemaId: number): Promise<number>;
  findById(id: number): Promise<CinemaHall>;
  findOne(filter: Record<string, any>): Promise<CinemaHall>;
  create(data: ICreateCinemaHallBody): Promise<CinemaHall>;
  update(id: number, data: IUpdateCinemaHallBody): Promise<CinemaHall>;
  delete(id: number): Promise<CinemaHall>;
}
