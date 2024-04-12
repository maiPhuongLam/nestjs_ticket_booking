import { Injectable } from '@nestjs/common';
import { Booking } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateBookingBody } from '../interfaces/create-booking.interface';

@Injectable()
export class BookingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.booking;
  }

  async create(data: CreateBookingBody): Promise<Booking> {
    return await this.repository.create({ data });
  }
}
