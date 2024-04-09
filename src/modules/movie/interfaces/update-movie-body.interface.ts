import { CreateMovieBody } from './create-movie-body.interface,ts';

export interface UpdateMovieBody extends Partial<CreateMovieBody> {
  thumbnail_public_id: string;
  thumbnail_url: string;
}
