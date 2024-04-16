import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './repositories/payment.repository';
import { CreatepaymentDto } from './dto';
import { PaymentMethod } from './enums/payment-method.enum';
import { BookingService } from '../booking/booking.service';
import { PaymentStatus } from '@prisma/client';
import { CreditCardTransactionRepository } from './repositories';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private stripe: Stripe
  constructor(
    private readonly configService: ConfigService,
    private readonly paymentRepository: PaymentRepository,
    private readonly creditCardTransactionRepository: CreditCardTransactionRepository,
    private readonly bookingService: BookingService,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('SECRET_KEY'), 
      {
        apiVersion: '2024-04-10'
      }
    )
  }

  async createPayment(createPaymentDto: CreatepaymentDto) {
    try {
      const { bookingId, paymentMethod, nameOnCard } = createPaymentDto
      const booking = await this.bookingService.getBooking(bookingId)
      if (paymentMethod === PaymentMethod.CREDIT_CARD_TRANSACTION && nameOnCard) {
        const charge = await this.stripe.charges.create({ amount: booking.price, currency: "VND" })
        const payment = await this.paymentRepository.create({
          bookingId: booking.id,
          amount: charge.amount,
          paymentStatus: PaymentStatus.PENDING,
          transactionId: 1
        })
        await this.creditCardTransactionRepository.create({ nameOnCard, paymentId: payment.id })
        return payment
      }
    } catch (error) {
      throw error
    }
  }
}
