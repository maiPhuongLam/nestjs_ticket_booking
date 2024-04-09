import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository(): Prisma.AdminDelegate {
    return this.prismaService.admin;
  }

  create(id: number): Promise<Admin> {
    return this.repository.create({ data: { user_id: id } });
  }

  findByUserId(id: number): Promise<Admin | null> {
    return this.repository.findUnique({ where: { user_id: id } });
  }
}
