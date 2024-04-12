import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressModule } from '../address/address.module';
import {
  CinemaRepository,
  CinemaHallRepository,
  SeatRepository,
  RowRepository,
} from './repositories';

@Module({
  imports: [PrismaModule, AddressModule],
  controllers: [CinemaController],
  providers: [
    CinemaService,
    CinemaRepository,
    CinemaHallRepository,
    SeatRepository,
    RowRepository,
  ],
  exports: [CinemaService],
})
export class CinemaModule {}
