import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateShowSeatBody } from '../interfaces';

@Injectable()
export class ShowSeatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.showSeat;
  }

  async create(data: CreateShowSeatBody) {
    return await this.repository.create({ data });
  }

  async update(id: number, data: Partial<CreateShowSeatBody>) {
    return await this.repository.update({ where: { id }, data });
  }
}
