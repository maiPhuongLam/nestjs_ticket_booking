import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CustomerRepository {
  private repository: Prisma.CustomerDelegate;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.customer;
  }

  create(id: number): Promise<Customer> {
    return this.repository.create({ data: { user_id: id } });
  }
}
