export interface IShowFilter {
  cinemaId?: number;
  movieTitle?: string;
  limit?: number;
  page?: number;
  orderBy?: Record<string, string>;
}
