import { Injectable, NotFoundException, flatten } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShowDto } from './dto';
import { ShowRepository } from './repositories/show.repository';
import { privateDecrypt } from 'crypto';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/enums';
import { ShowSeatRepository } from './repositories';
import { CinemaService } from '../cinema/cinema.service';
import { Row } from '@prisma/client';

@Injectable()
export class ShowService {
  constructor(
    private showRepository: ShowRepository,
    private showSeatRepository: ShowSeatRepository,
    private userService: UserService,
    private cinemaService: CinemaService,
  ) {}

  async getShow(id) {
    try {
      const show = await this.showRepository.findById(id);

      if (!show) {
        throw new NotFoundException();
      }

      return show;
    } catch (error) {
      throw error;
    }
  }

  async creatShow(userId: number, createShowDto: CreateShowDto) {
    try {
      const { cinema_hall_id, end_time, start_time, movie_id } = createShowDto;
      const adminId = await this.userService.getIdOfUserRole(
        userId,
        UserRoles.ADMIN,
      );
      const show = await this.showRepository.create({
        admin_id: adminId,
        cinema_hall_id,
        movie_id,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
      });
      const rows = show.cinema_hall.rows;
      for (const x of rows) {
        for (const y of x.seats) {
          await this.showSeatRepository.create({
            cinema_hall_seat_id: y.id,
            is_reserved: false,
            show_id: show.id,
            seat_number: `${y.seat_row}-${y.seat_col}`,
            price: createShowDto.price,
          });
        }
      }
      return show;
    } catch (error) {
      throw error;
    }
  }

  async updateShow(showId: number, updateShowDto: Partial<CreateShowDto>) {
    try {
      const show = await this.getShow(showId);
      return await this.showRepository.update(showId, updateShowDto);
    } catch (error) {
      throw error;
    }
  }
}
