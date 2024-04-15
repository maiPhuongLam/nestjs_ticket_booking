import { ICreateMovieBody } from './create-movie-body.interface,ts';

export interface IUpdateMovieBody extends Partial<ICreateMovieBody> {
  thumbnailPublicId: string;
  thumbnailUrl: string;
}
