import { Injectable } from '@nestjs/common';
import { FrontDeskOfficer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class FdoRepository {
  private repository: Prisma.FrontDeskOfficerDelegate;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.frontDeskOfficer;
  }

  create(id: number): Promise<FrontDeskOfficer> {
    return this.repository.create({ data: { user_id: id } });
  }
}
