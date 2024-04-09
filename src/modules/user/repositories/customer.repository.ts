import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository(): Prisma.CustomerDelegate {
    return this.prismaService.customer;
  }

  create(id: number): Promise<Customer> {
    return this.repository.create({ data: { user_id: id } });
  }

  findByUserId(id: number): Promise<Customer | null> {
    return this.repository.findUnique({ where: { user_id: id } });
  }
}
