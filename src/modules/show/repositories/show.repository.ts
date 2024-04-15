import { Injectable } from '@nestjs/common';
import { Prisma, Show } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ICreateShowBody, IShowRepository, IShowData, IShowFilter } from '../interfaces';

@Injectable()
export class ShowRepository implements IShowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.show;
  }

  async create(data: ICreateShowBody): Promise<IShowData> {
    return await this.repository.create({
      data,
      include: {
        cinemaHall: { select: { rows: { include: { seats: true } } } },
      },
    });
  }

  async findById(id: number): Promise<any> {
    return await this.repository.findUnique({
      where: { id },
      include: {
        cinemaHall: { select: { rows: { include: { seats: true } } } },
        showSeats: true,
      },
    });
  }

  async update(id: number, data: Partial<ICreateShowBody>) {
    return await this.repository.update({
      where: { id },
      data,
      include: {
        cinemaHall: { select: { rows: { include: { seats: true } } } },
        showSeats: true,
      },
    });
  }

  async findShowsInCinema(cinemaId: number): Promise<Show[]> {
    return await this.repository.findMany({
      where: { cinemaHall: { id: cinemaId } },
    });
  }

  async findShowsByMovie(movieId: number): Promise<Show[]> {
    return await this.repository.findMany({ where: { movieId: movieId } });
  }

  async find(filter: IShowFilter): Promise<any[]> {
    const { movieTitle, ...showFilter } = filter
    return await this.repository.findMany({ 
      where: { 
        movie: {
          title: filter.movieTitle
        },
        ...showFilter
      },
      select: { 
      movie: {
        select: { id: true, title: true, genre: true, description: true, country: true, language: true, releaseDate: true, thumbnailUrl: true, durationMin: true }
      }, 
      cinemaHall: {
        select: { id: true, name: true },
        include: { cinema: { select: { id: true, name: true, address: true}}}
      }
    }, 
    orderBy: filter.orderBy,
    take: filter.limit || 8,
    skip: (filter.limit || 8) * (+filter.page - 1), })
  }
}
