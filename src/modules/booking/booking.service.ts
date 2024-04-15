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
      const { bookingNo, numberOfSeats } = createBookingDto;
      const booking = await this.bookingRepository.create({
        bookingNo,
        numberOfSeats,
        customerId: customerId,
        showId: showId,
        status: BookingStatus.PENDING,
      });
      return booking;
    } catch (error) {
      throw error;
    }
  }
}
