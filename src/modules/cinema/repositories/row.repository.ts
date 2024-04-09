import { Injectable } from '@nestjs/common';
import { CinemaHall, Row } from '@prisma/client';
import { resourceUsage } from 'process';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateCinemaHallBody } from '../interfaces';

@Injectable()
export class RowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.row;
  }

  async findOne(filter: Record<string, any>): Promise<Row> {
    return await this.repository.findFirst({ where: filter });
  }

  async countRowByHallId(hallId: number) {
    return await this.repository.count({ where: { cinema_hall_id: hallId } });
  }

  async getRowsOfhhall(hallId: number) {
    return await this.repository.findMany({
      where: { cinema_hall_id: hallId },
    });
  }

  async create(data: {
    total_seats: number;
    cinema_hall_id: number;
    row_num: number;
  }): Promise<Row> {
    return await this.repository.create({ data });
  }

  async findById(id: number): Promise<Row> {
    return await this.repository.findUnique({ where: { id } });
  }
}
