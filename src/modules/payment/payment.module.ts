import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BookingModule } from '../booking/booking.module';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
  imports: [PrismaModule, ConfigModule, BookingModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
