import { Movie } from '@prisma/client';
import { ICreateMovieBody } from './create-movie-body.interface,ts';
import { IUpdateMovieBody } from './update-movie-body.interface';
import { IMovieFilter } from './movie-filter';

export interface IMovieRepository {
  create(data: ICreateMovieBody): Promise<Movie>;
  update(id: number, data: IUpdateMovieBody): Promise<Movie>;
  findById(id: number): Promise<Movie>;
  find(filter: IMovieFilter, orderBy: Record<string, any>): Promise<Movie[]>;
  delete(id: number): Promise<Movie>;
}
