import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateMovieBody, MovieFilter, UpdateMovieBody } from '../interfaces';

@Injectable()
export class MovieRepository {
  private repository: Prisma.MovieDelegate;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.movie;
  }

  create(data: CreateMovieBody): Promise<Movie> {
    return this.repository.create({ data });
  }

  update(id: number, data: UpdateMovieBody): Promise<Movie> {
    return this.repository.update({ where: { id }, data });
  }

  findById(id: number): Promise<Movie> {
    return this.repository.findUnique({ where: { id } });
  }

  find(filter: MovieFilter, orderBy: Record<string, any>): Promise<Movie[]> {
    return this.repository.findMany({
      where: filter,
      orderBy: orderBy,
      select: {
        id: true,
        title: true,
        genre: true,
        country: true,
        language: true,
        description: true,
        release_date: true,
        created_at: true,
        duration_min: true,
        admin_id: true,
        updated_at: true,
      },
      take: filter.limit || 8,
      skip: (filter.limit || 8) * (+filter.page - 1),
    });
  }

  delete(id): Promise<Movie> {
    return this.repository.delete({ where: { id } });
  }
}
