import { Injectable } from '@nestjs/common';
import { BookingRepository } from './repositories/booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/enums';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly userService: UserService,
  ) {}

  async createBooking(
    userId: number,
    showId: number,
    createBookingDto: CreateBookingDto,
  ) {
    try {
      const customerId = await this.userService.getIdOfUserRole(
        userId,
        UserRoles.CUSTOMER,
      );
      const { booking_no, number_of_seats } = createBookingDto;
      const booking = await this.bookingRepository.create({
        booking_no,
        number_of_seats,
        customer_id: customerId,
        show_id: showId,
        status: BookingStatus.PENDING,
      });
      return booking;
    } catch (error) {
      throw error;
    }
  }
}
