import { Injectable, NotFoundException, flatten } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShowDto, ShowFilterDto, ShowResponseDto } from './dto';
import { ShowRepository } from './repositories/show.repository';
import { privateDecrypt } from 'crypto';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/enums';
import { ShowSeatRepository } from './repositories';
import { CinemaService } from '../cinema/cinema.service';
import { Row, Show } from '@prisma/client';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class ShowService {
  constructor(
    private showRepository: ShowRepository,
    private showSeatRepository: ShowSeatRepository,
    private userService: UserService,
    private cinemaService: CinemaService,
    private movieService: MovieService
  ) {}

  async getShow(id: number): Promise<ShowResponseDto> {
    try {
      const show = await this.showRepository.findById(id);

      if (!show) {
        throw new NotFoundException();
      }

      return ShowResponseDto.plainToClass(show);
    } catch (error) {
      throw error;
    }
  }

  async getShows(filter: ShowFilterDto) {
    try {
      let orderBy: Record<string, string>;
      switch (filter.orderBy) {
        case 'ascName':
          orderBy = { name: 'asc' };
          break;
        case 'descName':
          orderBy = { name: 'desc' }; // Corrected to 'desc'
          break;
        default:
          orderBy = { name: 'asc' };
          break;
      }
      return await this.showRepository.find({ ...filter, orderBy });
    } catch (error) {
      throw error;
    }
  }
  

  async creatShow(userId: number, createShowDto: CreateShowDto): Promise<Show> {
    try {
      const { cinemaHallId, endTime, startTime, movieId } = createShowDto;
      const adminId = await this.userService.getIdOfUserRole(
        userId,
        UserRoles.ADMIN,
      );
      const show = await this.showRepository.create({
        adminId: adminId,
        cinemaHallId,
        movieId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });
      const rows = show.cinemaHall.rows;
      for (const row of rows) {
        for (const seat of row.seats) {
          await this.showSeatRepository.create({
            cinemaHallSeatId: seat.id,
            isReserved: false,
            showId: show.id,
            seatNumber: `${seat.seatRow}-${seat.seatCol}`,
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
