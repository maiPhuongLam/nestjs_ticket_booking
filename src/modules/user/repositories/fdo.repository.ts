import { Injectable } from '@nestjs/common';
import { FrontDeskOfficer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IBaseUserRepository } from '../interfaces';

@Injectable()
export class FdoRepository implements IBaseUserRepository<FrontDeskOfficer> {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository(): Prisma.FrontDeskOfficerDelegate {
    return this.prismaService.frontDeskOfficer;
  }

  create(id: number): Promise<FrontDeskOfficer> {
    return this.repository.create({ data: { userId: id } });
  }

  findByUserId(id: number): Promise<FrontDeskOfficer | null> {
    return this.repository.findUnique({ where: { userId: id } });
  }
}
