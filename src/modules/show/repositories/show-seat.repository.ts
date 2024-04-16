import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ICreateShowSeatBody, IShowSeatRepository } from '../interfaces';

@Injectable()
export class ShowSeatRepository implements IShowSeatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.showSeat;
  }

  async findById(id: number) {
    return await this.repository.findUnique({ where: { id } });
  }

  async create(data: ICreateShowSeatBody) {
    return await this.repository.create({ data });
  }

  async update(id: number, data: Partial<ICreateShowSeatBody>) {
    return await this.repository.update({ where: { id }, data });
  }
}
