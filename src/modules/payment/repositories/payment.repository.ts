import { Injectable } from "@nestjs/common";
import { ICreatePaymentBody, IPaymentRepository } from "../interfaces";
import { $Enums, Payment } from "@prisma/client";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository() {
    return this.prismaService.payment
  }

  async create(data: ICreatePaymentBody): Promise<Payment> {
    return await this.repository.create({ data })
  }
  async findById(id: number): Promise<Payment> {
    return await this.repository.findUnique({ where: { id } })
  }
  async findByBookingId(bookingId: number): Promise<Payment> {
    return await this.repository.findUnique({ where: { bookingId }})
  }
  async find(): Promise<Payment[]> {
    return await this.repository.findMany()
  }
  async update(id: number, data: Partial<ICreatePaymentBody>): Promise<Payment> {
    return await this.repository.update({ where: { id }, data })
  }
  async delete(id: number): Promise<Payment> {
    return await this.repository.delete({ where: { id }})
  }
  
}