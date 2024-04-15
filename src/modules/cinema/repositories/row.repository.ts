import { Injectable } from '@nestjs/common';
import { CinemaHall, Row } from '@prisma/client';
import { resourceUsage } from 'process';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IRowRepository } from '../interfaces';

@Injectable()
export class RowRepository implements IRowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.row;
  }

  async findOne(filter: Record<string, any>): Promise<Row> {
    return await this.repository.findFirst({ where: filter });
  }

  async countRowByHallId(hallId: number) {
    return await this.repository.count({ where: { cinemaHallId: hallId } });
  }
  getRowsOfHall(hallId: number): Promise<
    {
      id: number;
      rowNum: number;
      totalSeats: number;
      cinemaHallId: number;
    }[]
  > {
    throw new Error('Method not implemented.');
  }

  async create(data: {
    totalSeats: number;
    cinemaHallId: number;
    rowNum: number;
  }): Promise<Row> {
    return await this.repository.create({ data });
  }

  async findById(id: number): Promise<Row> {
    return await this.repository.findUnique({ where: { id } });
  }
}
