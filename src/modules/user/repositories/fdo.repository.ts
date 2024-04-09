import { Injectable } from '@nestjs/common';
import { FrontDeskOfficer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class FdoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository(): Prisma.FrontDeskOfficerDelegate {
    return this.prismaService.frontDeskOfficer;
  }

  create(id: number): Promise<FrontDeskOfficer> {
    return this.repository.create({ data: { user_id: id } });
  }

  findByUserId(id: number): Promise<FrontDeskOfficer | null> {
    return this.repository.findUnique({ where: { user_id: id } });
  }
}
