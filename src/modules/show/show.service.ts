import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowDto, ShowFilterDto, ShowResponseDto } from './dto';
import { ShowRepository } from './repositories/show.repository';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/enums';
import { ShowSeatRepository } from './repositories';
import { ShowSeat } from '@prisma/client';

@Injectable()
export class ShowService {
  constructor(
    private showRepository: ShowRepository,
    private showSeatRepository: ShowSeatRepository,
    private userService: UserService,
  ) {}

  async getSeat(id: number) {
    try {
      const seat = await this.showSeatRepository.findById(id)
       if (!seat) {
        throw new NotFoundException('Seat not found')
       }

       return seat
    } catch (error) {
      throw error
    }
  }

  async getShow(id: number): Promise<ShowResponseDto> {
    try {
      const show = await this.showRepository.findById(id);

      if (!show) {
        throw new NotFoundException();
      }
      return ShowResponseDto.plainToClass(show)
    } catch (error) {
      throw error;
    }
  }

  async getShows(filter: ShowFilterDto): Promise<ShowResponseDto[]> {
    try {
      let orderBy: Record<string, string>;
      switch (filter.orderBy) {
        case 'ascStartTime':
          orderBy = { startTime: 'asc' };
          break;
        case 'descStartTime':
          orderBy = { startTime: 'desc' };
          break;
        default:
          orderBy = { startTime: 'asc' };
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
        console.log(row);
        
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

  async updateShow(showId: number, updateShowDto: Partial<CreateShowDto>): Promise<ShowResponseDto> {
    try {
      await this.getShow(showId);
      const show =  await this.showRepository.update(showId, updateShowDto);
      return ShowResponseDto.plainToClass(show)
    } catch (error) {
      throw error;
    }
  }

  async updateShowSeat(showSeatId: number, updateShowSeatDto: Record<string, any>): Promise<ShowSeat> {
    try {
      const seat = await this.showSeatRepository.findById(showSeatId) 

      if (!seat) {
        throw new NotFoundException('Seat not found')
      }

      return await this.showSeatRepository.update(seat.id, updateShowSeatDto)
    } catch (error) {
      throw error
    }
  }

 
} 
