import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AdminRepository {
  private repository: Prisma.AdminDelegate;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.admin;
  }

  create(id: number): Promise<Admin> {
    return this.repository.create({ data: { user_id: id } });
  }
}
