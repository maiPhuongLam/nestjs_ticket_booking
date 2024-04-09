import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateSeatBody } from '../interfaces';
import { Seat } from '@prisma/client';

@Injectable()
export class SeatRepository {
  constructor(private prismaSerice: PrismaService) {}

  private get repository() {
    return this.prismaSerice.seat;
  }

  async create(data: CreateSeatBody): Promise<Seat> {
    return await this.repository.create({ data });
  }

  async findById(id): Promise<Seat> {
    return await this.repository.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<CreateSeatBody>): Promise<Seat> {
    return await this.repository.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: number): Promise<Seat> {
    return await this.repository.delete({
      where: { id },
    });
  }
}
