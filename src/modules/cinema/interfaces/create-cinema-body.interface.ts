import { Address } from '@prisma/client';

export interface CreateCinemaBody {
  name: string;
  total_cinema_hall: number;
  address_id: number;
}
