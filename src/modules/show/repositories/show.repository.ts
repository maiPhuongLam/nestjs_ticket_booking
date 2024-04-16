import { Injectable } from '@nestjs/common';
import { Prisma, Show } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  ICreateShowBody,
  IShowRepository,
  IShowData,
  IShowFilter,
  IShowDetails,
} from '../interfaces';

@Injectable()
export class ShowRepository implements IShowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.show;
  }

  private get showDetails() {
    return {
      cinemaHall: {
        select: {
          id: true,
          name: true,
          rows: {
            select: {
              id: true,
              seats: {
                select: {
                  id: true,
                  seatRow: true,
                  seatCol: true,
                },
              },
            },
          },
          cinema: {
            select: {
              id: true,
              name: true,
              address: {
                select: {
                  id: true,
                  streetAddress: true,
                  state: true,
                  zipcode: true,
                  country: true,
                },
              },
            },
          },
        },
      },
      showSeats: {
        select: {
          id: true,
          seatNumber: true,
          isReserved: true,
          price: true,
          bookingId: true,
        },
      },
      movie: {
        select: {
          id: true,
          title: true,
          description: true,
          durationMin: true,
          language: true,
          thumbnailPublicId: true,
          thumbnailUrl: true,
          releaseDate: true,
          country: true,
          genre: true,
        },
      },
    };
  }

  async create(data: ICreateShowBody): Promise<IShowDetails> {
    return await this.repository.create({
      data,
      include: this.showDetails,
    });
  }

  async findById(id: number): Promise<IShowDetails | null> {
    return await this.repository.findUnique({
      where: { id },
      include: this.showDetails,
    });
  }

  async update(
    id: number,
    data: Partial<ICreateShowBody>,
  ): Promise<IShowDetails> {
    return await this.repository.update({
      where: { id },
      data,
      include: this.showDetails,
    });
  }

  async find(filter: IShowFilter): Promise<Show[]> {
    const { movieTitle, orderBy, ...showFilter } = filter;
    
    const queryOptions = {
      where: {
        movie: {
          title: movieTitle,
        },
        ...showFilter,
      },
      include: {
        cinemaHall: {
          include: {
            cinema: {
              include: {
                address: true,
              },
            },
          },
        },
        movie: true,
      },
      orderBy,
      take: filter.limit || 8,
      skip: (filter.limit || 8) * (+(filter.page || 1) - 1),
    };

    return await this.repository.findMany(queryOptions);
  }

  async delete(id: number): Promise<Show> {
    return await this.repository.delete({ where: { id } })
  }
}
