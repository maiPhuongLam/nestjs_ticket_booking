import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CurrentUserId, Roles } from 'src/common/decorators';
import { UserRoles } from '../user/enums';
import { RolesGuard } from 'src/common/guards';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(RolesGuard)
  @Roles([UserRoles.CUSTOMER])
  @Post(':id')
  async createBooking(
    @CurrentUserId() userId: number,
    @Param('showId') showId: number,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return await this.bookingService.createBooking(
      userId,
      showId,
      createBookingDto,
    );
  }
}
