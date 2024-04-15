export interface ICreateMovieBody {
  title: string;
  description: string;
  durationMin: number;
  language: string;
  releaseDate: Date;
  country: string;
  genre: string;
  adminId: number;
}
