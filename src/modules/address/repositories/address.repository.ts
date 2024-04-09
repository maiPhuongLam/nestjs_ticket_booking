import { Injectable } from '@nestjs/common';
import { Address, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateAddressBody, UpdateAddressBody } from '../interfaces';

@Injectable()
export class AddressRepository {
  private repository: Prisma.AddressDelegate;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.address;
  }

  async findAll(): Promise<Address[]> {
    return this.repository.findMany();
  }

  async findById(id: number): Promise<Address | null> {
    return this.repository.findUnique({
      where: { id },
    });
  }

  async create(data: CreateAddressBody): Promise<Address> {
    return this.repository.create({
      data,
    });
  }

  async update(id: number, data: UpdateAddressBody): Promise<Address | null> {
    return this.repository.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Address | null> {
    return this.repository.delete({
      where: { id },
    });
  }
}
