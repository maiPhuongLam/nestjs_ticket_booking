import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IBaseUserRepository } from '../interfaces';

@Injectable()
export class AdminRepository implements IBaseUserRepository<Admin> {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository(): Prisma.AdminDelegate {
    return this.prismaService.admin;
  }

  create(id: number): Promise<Admin> {
    return this.repository.create({ data: { userId: id } });
  }

  findByUserId(id: number): Promise<Admin | null> {
    return this.repository.findUnique({ where: { userId: id } });
  }
}
