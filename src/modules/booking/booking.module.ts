import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { BookingRepository } from './repositories/booking.repository';
import { ShowModule } from '../show/show.module';

@Module({
  imports: [PrismaModule, UserModule, ShowModule],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  exports: [BookingService]
})
export class BookingModule {}
