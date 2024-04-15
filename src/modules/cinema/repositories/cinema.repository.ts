// cinema.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cinema, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCinemaDto } from '../dto';
import {
  ICinemaRepository,
  ICreateCinemaBody,
  IUpdateCinemaBody,
} from '../interfaces';

@Injectable()
export class CinemaRepository implements ICinemaRepository {
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
        addressId: true,
        totalCinemaHalls: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!cinema) {
      throw new NotFoundException('Cinema not found');
    }
    return cinema;
  }

  async create(data: ICreateCinemaBody): Promise<Cinema> {
    return this.repository.create({
      data: {
        name: data.name,
        totalCinemaHalls: data.totalCinemaHalls,
        addressId: data.addressId,
      },
    });
  }

  async update(id: number, data: IUpdateCinemaBody): Promise<Cinema | null> {
    return this.repository.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Cinema | null> {
    return this.repository.delete({ where: { id } });
  }
}
