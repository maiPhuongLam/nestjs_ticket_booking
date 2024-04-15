import { Show } from '@prisma/client';
import { ICreateShowBody } from './create-show-body.interface';
import { IShowData } from './show-data.interface';
import { IShowFilter } from './show-filter.interface';
import { IShowDetails } from './show-detail.interface';

export interface IShowRepository {
  create(data: ICreateShowBody): Promise<IShowDetails>;
  findById(id: number): Promise<IShowDetails | null>;
  update(id: number, data: Partial<ICreateShowBody>): Promise<IShowDetails>;
  findShowsInCinema(cinemaId: number): Promise<Show[]>;
  findShowsByMovie(movieId: number): Promise<Show[]>;
  find(filter: IShowFilter): Promise<Show[]>;
}
