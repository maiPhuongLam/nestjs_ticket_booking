import { Injectable } from '@nestjs/common';
import { Booking, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IBookingRepository, ICreateBookingBody } from '../interfaces';

@Injectable()
export class BookingRepository implements IBookingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.booking;
  }

  async create(data: ICreateBookingBody): Promise<Booking> {
    return await this.repository.create({ data });
  }
}
