import { CreateMovieBody } from './create-movie-body.interface,ts';

export interface UpdateMovieBody extends Partial<CreateMovieBody> {}
