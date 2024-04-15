import { Address } from '@prisma/client';

export interface ICreateCinemaBody {
  name: string;
  totalCinemaHalls: number;
  addressId: number;
}
