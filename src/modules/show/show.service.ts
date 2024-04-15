import { Injectable, NotFoundException, flatten } from '@nestjs/common';
import { CreateShowDto, ShowFilterDto, ShowResponseDto } from './dto';
import { ShowRepository } from './repositories/show.repository';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/enums';
import { ShowSeatRepository } from './repositories';
import { CinemaService } from '../cinema/cinema.service';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class ShowService {
  constructor(
    private showRepository: ShowRepository,
    private showSeatRepository: ShowSeatRepository,
    private userService: UserService,
  ) {}

  async getShow(id: number): Promise<any> {
    try {
      const show = await this.showRepository.findById(id);

      if (!show) {
        throw new NotFoundException();
      }
      return show
    } catch (error) {
      throw error;
    }
  }

  async getShows(filter: ShowFilterDto): Promise<ShowResponseDto[]> {
    try {
      let orderBy: Record<string, string>;
      switch (filter.orderBy) {
        case 'ascName':
          orderBy = { name: 'asc' };
          break;
        case 'descName':
          orderBy = { name: 'desc' };
          break;
        default:
          orderBy = { name: 'asc' };
          break;
      }
      const shows = await this.showRepository.find({ ...filter, orderBy });
      const showsResult = shows.map((show) =>
        ShowResponseDto.plainToClass(show),
      );
      return showsResult;
    } catch (error) {
      throw error;
    }
  }

  async creatShow(userId: number, createShowDto: CreateShowDto): Promise<ShowResponseDto> {
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
      return ShowResponseDto.plainToClass(show);
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
