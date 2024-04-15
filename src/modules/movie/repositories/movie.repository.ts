import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  ICreateMovieBody,
  IMovieFilter,
  IUpdateMovieBody,
} from '../interfaces';
import { IMovieRepository } from '../interfaces/movie-repository.interface';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository(): Prisma.MovieDelegate {
    return this.prismaService.movie;
  }

  create(data: ICreateMovieBody): Promise<Movie> {
    return this.repository.create({ data });
  }

  update(id: number, data: IUpdateMovieBody): Promise<Movie> {
    return this.repository.update({ where: { id }, data });
  }

  findById(id: number): Promise<Movie> {
    return this.repository.findUnique({ where: { id } });
  }

  find(filter: IMovieFilter): Promise<Movie[]> {
    const { orderBy, title, ...movieFilter } = filter;
    return this.repository.findMany({
      where: {
        ...movieFilter,
        title: {
          contains: title,
        },
      },
      orderBy: orderBy,
      select: {
        id: true,
        title: true,
        thumbnailPublicId: true,
        thumbnailUrl: true,
        genre: true,
        country: true,
        language: true,
        description: true,
        releaseDate: true,
        createdAt: true,
        durationMin: true,
        adminId: true,
        updatedAt: true,
      },
      take: filter.limit || 8,
      skip: (filter.limit || 8) * (+filter.page - 1),
    });
  }

  delete(id): Promise<Movie> {
    return this.repository.delete({ where: { id } });
  }
}
