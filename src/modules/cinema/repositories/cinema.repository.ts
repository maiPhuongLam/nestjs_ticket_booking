// cinema.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cinema, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCinemaDto } from '../dto';
import { CreateCinemaBody, UpdateCinemaBody } from '../interfaces';

@Injectable()
export class CinemaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository(): Prisma.CinemaDelegate {
    return this.prismaService.cinema;
  }

  async findAll(): Promise<Cinema[]> {
    return this.repository.findMany();
  }

  async findById(id: number): Promise<Cinema | null> {
    const cinema = await this.repository.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        address_id: true,
        total_cinema_hall: true,
        created_at: true,
        updated_at: true,
      },
    });
    if (!cinema) {
      throw new NotFoundException('Cinema not found');
    }
    return cinema;
  }

  async create(data: CreateCinemaBody): Promise<Cinema> {
    return this.repository.create({
      data: {
        name: data.name,
        total_cinema_hall: data.total_cinema_hall,
        address_id: data.address_id,
      },
    });
  }

  async update(id: number, data: UpdateCinemaBody): Promise<Cinema | null> {
    return this.repository.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Cinema | null> {
    return this.repository.delete({ where: { id } });
  }
}
