import { Cinema } from '@prisma/client';
import { ICreateCinemaBody } from './create-cinema-body.interface';
import { IUpdateCinemaBody } from './update-cinema-body.interface';

export interface ICinemaRepository {
  findAll(): Promise<Cinema[]>;
  findById(id: number): Promise<Cinema | null>;
  create(data: ICreateCinemaBody): Promise<Cinema>;
  update(id: number, data: IUpdateCinemaBody): Promise<Cinema | null>;
  delete(id: number): Promise<Cinema | null>;
}
