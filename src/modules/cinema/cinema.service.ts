import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cinema, Row, SeatType } from '@prisma/client';
import { CreateCinemaDto, CreateCinemaHallDto, CreateSeatDto } from './dto';
import { AddressService } from '../address/address.service';
import {
  CinemaHallRepository,
  CinemaRepository,
  RowRepository,
  SeatRepository,
} from './repositories';
import { SetSeatTypeDto } from './dto/set-Seat-Type.dto';

@Injectable()
export class CinemaService {
  constructor(
    private readonly cinemaRepository: CinemaRepository,
    private readonly cinemaHallRepository: CinemaHallRepository,
    private readonly rowRepository: RowRepository,
    private readonly seatRepository: SeatRepository,
    private readonly addressService: AddressService,
  ) {}

  async getAllCinemas(): Promise<Cinema[]> {
    return this.cinemaRepository.findAll();
  }

  async getCinema(id: number): Promise<Cinema | null> {
    const cinema = await this.cinemaRepository.findById(id);
    if (!cinema) {
      throw new NotFoundException('Cinema not found');
    }
    return cinema;
  }

  async createCinema(createCinemaDto: CreateCinemaDto): Promise<Cinema> {
    try {
      const { address, name, total_cinema_hall } = createCinemaDto;
      const cinemaAddress = await this.addressService.createAddress(address);
      return this.cinemaRepository.create({
        address_id: cinemaAddress.id,
        name,
        total_cinema_hall,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCinema(
    id: number,
    updateData: Partial<CreateCinemaDto>,
  ): Promise<Cinema | null> {
    const existingCinema = await this.cinemaRepository.findById(id);
    if (!existingCinema) {
      throw new NotFoundException('Cinema not found');
    }
    return this.cinemaRepository.update(id, updateData);
  }

  async deleteCinema(id: number): Promise<Cinema | null> {
    const existingCinema = await this.cinemaRepository.findById(id);
    if (!existingCinema) {
      throw new NotFoundException('Cinema not found');
    }
    return this.cinemaRepository.delete(id);
  }

  async addHallToCinema(id: number, createCinemaHallDto: CreateCinemaHallDto) {
    const { num_seats_per_row, total_rows, name, total_seats } =
      createCinemaHallDto;
    const cinema = await this.getCinema(id);

    const numCinemaHalls =
      await this.cinemaHallRepository.countCinemaByCinemaId(cinema.id);

    if (numCinemaHalls >= cinema.total_cinema_hall) {
      throw new BadRequestException('Cinema is full hall');
    }

    const cinemaHall = await this.cinemaHallRepository.creat({
      cinema_id: id,
      name,
      total_rows,
      total_seats,
    });

    for (let i = 0; i < total_rows; i++) {
      const row = await this.rowRepository.create({
        cinema_hall_id: cinemaHall.id,
        row_num: i + 1,
        total_seats: num_seats_per_row[i],
      });
      for (let j = 0; j < row.total_seats; j++) {
        await this.seatRepository.create({
          row_id: row.id,
          type: SeatType.REGULAR,
          seat_row: row.row_num,
          seat_col: i + 1,
        });
      }
    }
    return cinemaHall;
  }

  async updateSeatType(seatId: number, seatType: SeatType) {
    try {
      const seat = await this.seatRepository.findById(seatId);

      if (!seat) {
        throw new NotFoundException('Seat not found');
      }

      return await this.seatRepository.update(seatId, { type: seatType });
    } catch (error) {
      throw error;
    }
  }

  async deleteSeat(seatId: number) {
    try {
      const seat = await this.seatRepository.findById(seatId);

      if (!seat) {
        throw new NotFoundException('Seat not found');
      }
      await this.seatRepository.delete(seatId);
    } catch (error) {
      throw error;
    }
  }
}
