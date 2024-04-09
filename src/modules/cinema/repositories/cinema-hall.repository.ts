import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateCinemaHallBody, CreateCinemaHallBody } from '../interfaces';
import { CinemaHall } from '@prisma/client';

@Injectable()
export class CinemaHallRepository {
  constructor(private prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.cinemaHall;
  }

  async countCinemaByCinemaId(cinemaId: number): Promise<number> {
    return await this.repository.count({ where: { cinema_id: cinemaId } });
  }

  async findById(id: number): Promise<CinemaHall> {
    return await this.repository.findUnique({ where: { id } });
  }

  async findOne(filter: Record<string, any>): Promise<CinemaHall> {
    return await this.repository.findFirst({ where: filter });
  }

  async creat(data: CreateCinemaHallBody): Promise<CinemaHall> {
    return await this.repository.create({ data });
  }

  async update(id: number, data: UpdateCinemaHallBody): Promise<CinemaHall> {
    return this.repository.update({ where: { id }, data });
  }

  async delete(id: number): Promise<CinemaHall> {
    return await this.repository.delete({ where: { id } });
  }
}
