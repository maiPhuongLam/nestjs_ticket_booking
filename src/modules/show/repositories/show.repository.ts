import { Injectable } from '@nestjs/common';
import { Prisma, Show } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateShowBody, ShowData } from '../interfaces';

@Injectable()
export class ShowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.show;
  }

  async create(data: CreateShowBody): Promise<ShowData> {
    return await this.repository.create({
      data,
      include: {
        cinema_hall: { select: { rows: { include: { seats: true } } } },
      },
    });
  }

  async findById(id: number): Promise<any> {
    return await this.repository.findUnique({
      where: { id },
      include: {
        cinema_hall: { select: { rows: { include: { seats: true } } } },
        show_seats: true
      },
    });
  }

  async update(id: number, data: Partial<CreateShowBody>) {
    return await this.repository.update({ where: { id }, data });
  }

  async findShowsInCinema(cinemaId: number): Promise<Show[]> {
    return await this.repository.findMany({
      where: { cinema_hall: { id: cinemaId } },
    });
  }

  async findShowsByMovie(movieId: number): Promise<Show[]> {
    return await this.repository.findMany({ where: { movie_id: movieId } });
  }
}
