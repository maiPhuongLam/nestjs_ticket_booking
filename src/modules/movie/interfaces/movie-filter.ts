export interface IMovieFilter {
  page?: number;
  limit?: number;
  title?: string;
  director?: string;
  genre?: string;
  sort?: string;
  orderBy?: Record<string, any>;
}
