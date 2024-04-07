export interface CreateMovieBody {
  title: string;
  description: string;
  duration_min: number;
  language: string;
  release_date: Date;
  country: string;
  genre: string;
  admin_id: number;
}
