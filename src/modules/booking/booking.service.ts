import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './repositories/booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/enums';
import { BookingStatus, ShowSeat } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { ShowService } from '../show/show.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly userService: UserService,
    private readonly showService: ShowService
  ) {}

  async createBooking(
    userId: number,
    createBookingDto: CreateBookingDto,
  ) {
    try {
      const { showId, seats } = createBookingDto
      const seatPromises = seats.map(seatId => this.showService.getSeat(seatId));
      const showSeats = await Promise.all(seatPromises);  
      await this.showService.getShow(showId);
  
      for (const seat of showSeats) {
        if (seat.isReserved) {
          throw new ForbiddenException('Seat has been already reserved');
        }
      }
      
      const customerId = await this.userService.getIdOfUserRole(userId, UserRoles.CUSTOMER);
      const bookingNo = uuidv4().split('-')[1] + (new Date()).getTime();
      const price = showSeats.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
      const booking = await this.bookingRepository.createWithTransaction({
        bookingNo,
        numberOfSeats: seats.length,
        customerId,
        showId,
        status: BookingStatus.PENDING,
        price
      });
      
      const updateShowSheats = showSeats.map(seat => this.showService.updateShowSeat(seat.id, { isReserved: true, bookingId: booking.id }))
      Promise.all(updateShowSheats).catch(err => {
        throw new BadRequestException(err.message)
      })

      return booking
      
    } catch (error) {
      throw error;
    }
  }

  async getBooking(id: number) {
    try {
      const booking = await this.bookingRepository.findById(id)

      if (!booking) {
        throw new NotFoundException('Booking not found')
      }

      return booking
    } catch (error) {
      throw error
    }
  }
  
}
