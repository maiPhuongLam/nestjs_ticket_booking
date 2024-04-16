import { Booking } from "@prisma/client";
import { IBookingRepository, ICreateBookingBody } from "../interfaces";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BookingRepository implements IBookingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.booking;
  }

  async create(data: ICreateBookingBody): Promise<Booking> {
    return await this.repository.create({ data });
  }

  async createWithTransaction(data: ICreateBookingBody): Promise<Booking> {
    return this.prismaService.$transaction(async (prisma) => {
      const booking = await prisma.booking.create({ data });
      return booking;
    }).catch((error) => {
      console.error('Transaction failed:', error);
      throw error;
    });
  }

  async findById(id): Promise<Booking> {
    return await this.repository.findUnique({ where: { id } })
  }

  async find(): Promise<Booking[]> {
    return await this.repository.findMany()
  }
}
