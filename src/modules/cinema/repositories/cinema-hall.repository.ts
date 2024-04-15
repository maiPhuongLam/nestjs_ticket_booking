import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  IUpdateCinemaHallBody,
  ICreateCinemaHallBody,
  ICinemaHallRepository,
} from '../interfaces';
import { CinemaHall } from '@prisma/client';

@Injectable()
export class CinemaHallRepository implements ICinemaHallRepository {
  constructor(private prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.cinemaHall;
  }
  async create(
    data: ICreateCinemaHallBody,
  ): Promise<{
    id: number;
    name: string;
    totalSeats: number;
    totalRows: number;
    cinemaId: number;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }

  async countCinemaByCinemaId(cinemaId: number): Promise<number> {
    return await this.repository.count({ where: { cinemaId: cinemaId } });
  }

  async findById(id: number): Promise<CinemaHall> {
    return await this.repository.findUnique({ where: { id } });
  }

  async findOne(filter: Record<string, any>): Promise<CinemaHall> {
    return await this.repository.findFirst({ where: filter });
  }

  async creat(data: ICreateCinemaHallBody): Promise<CinemaHall> {
    return await this.repository.create({ data });
  }

  async update(id: number, data: IUpdateCinemaHallBody): Promise<CinemaHall> {
    return this.repository.update({ where: { id }, data });
  }

  async delete(id: number): Promise<CinemaHall> {
    return await this.repository.delete({ where: { id } });
  }
}
