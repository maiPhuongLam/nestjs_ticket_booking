import { Show } from '@prisma/client';
import { ICreateShowBody } from './create-show-body.interface';
import { IShowData } from './show-data.interface';
import { IShowFilter } from './show-filter.interface';

export interface IShowRepository {
  create(data: ICreateShowBody): Promise<IShowData>;
  findById(id: number): Promise<Show | null>;
  update(id: number, data: Partial<ICreateShowBody>): Promise<IShowData>;
  findShowsInCinema(cinemaId: number): Promise<Show[]>;
  findShowsByMovie(movieId: number): Promise<Show[]>;
  find(filter: IShowFilter): Promise<Show[]>;
}
