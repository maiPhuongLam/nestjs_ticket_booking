import { Injectable } from '@nestjs/common';
import { Prisma, Show } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ShowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get repository(): Prisma.ShowDelegate {
    return this.prismaService.show;
  }
}
