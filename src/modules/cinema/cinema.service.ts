import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SeatType } from '@prisma/client';
import { CinemaResponseDto, CreateCinemaDto, CreateCinemaHallDto } from './dto';
import { AddressService } from '../address/address.service';
import {
  CinemaHallRepository,
  CinemaRepository,
  RowRepository,
  SeatRepository,
} from './repositories';
import { CinemaHallResponseDto } from './dto/cinema-hall-response.dto';

@Injectable()
export class CinemaService {
  constructor(
    private readonly cinemaRepository: CinemaRepository,
    private readonly cinemaHallRepository: CinemaHallRepository,
    private readonly rowRepository: RowRepository,
    private readonly seatRepository: SeatRepository,
    private readonly addressService: AddressService,
  ) {}

  async getAllCinemas(): Promise<CinemaResponseDto[]> {
    try {
      const cinemas = await this.cinemaRepository.findAll();
      const result = cinemas.map((cinema) =>
        CinemaResponseDto.plainToClass(cinema),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCinema(id: number): Promise<CinemaResponseDto> {
    try {
      const cinema = await this.cinemaRepository.findById(id);

      if (!cinema) {
        throw new NotFoundException('Cinema not found');
      }

      return CinemaResponseDto.plainToClass(cinema);
    } catch (error) {
      throw error;
    }
  }

  async getCinemaHall(hallId: number): Promise<CinemaHallResponseDto> {
    try {
      const cinemaHall = await this.cinemaHallRepository.findById(hallId);

      if (!cinemaHall) {
        throw new NotFoundException('hall not found');
      }
      return CinemaHallResponseDto.plainToClass(cinemaHall);
    } catch (error) {
      throw error;
    }
  }

  async createCinema(
    createCinemaDto: CreateCinemaDto,
  ): Promise<CinemaResponseDto> {
    try {
      const { address, name, totalCinemaHalls } = createCinemaDto;
      const cinemaAddress = await this.addressService.createAddress(address);
      const cinema = await this.cinemaRepository.create({
        addressId: cinemaAddress.id,
        name,
        totalCinemaHalls,
      });
      return CinemaResponseDto.plainToClass(cinema);
    } catch (error) {
      throw error;
    }
  }

  async updateCinema(
    id: number,
    updateData: Partial<CreateCinemaDto>,
  ): Promise<CinemaResponseDto> {
    try {
      const existingCinema = await this.cinemaRepository.findById(id);
      if (!existingCinema) {
        throw new NotFoundException('Cinema not found');
      }
      const cinema = await this.cinemaRepository.update(id, updateData);
      return CinemaResponseDto.plainToClass(cinema);
    } catch (error) {
      throw error;
    }
  }

  async deleteCinema(id: number): Promise<CinemaResponseDto> {
    try {
      const existingCinema = await this.cinemaRepository.findById(id);
      if (!existingCinema) {
        throw new NotFoundException('Cinema not found');
      }
      const cinema = await this.cinemaRepository.delete(id);
      return CinemaResponseDto.plainToClass(cinema);
    } catch (error) {
      throw error;
    }
  }

  async addHallToCinema(
    id: number,
    createCinemaHallDto: CreateCinemaHallDto,
  ): Promise<CinemaHallResponseDto> {
    try {
      const { numSeatsPerRow, totalRows, name, totalSeats } =
        createCinemaHallDto;
      const cinema = await this.getCinema(id);

      const numCinemaHalls =
        await this.cinemaHallRepository.countCinemaByCinemaId(cinema.id);

      if (numCinemaHalls >= cinema.totalCinemaHalls) {
        throw new BadRequestException('Cinema is full hall');
      }

      const cinemaHall = await this.cinemaHallRepository.creat({
        cinemaId: id,
        name,
        totalRows,
        totalSeats,
      });

      for (let i = 0; i < totalRows; i++) {
        const row = await this.rowRepository.create({
          cinemaHallId: cinemaHall.id,
          rowNum: i + 1,
          totalSeats: numSeatsPerRow[i],
        });
        for (let j = 0; j < row.totalSeats; j++) {
          await this.seatRepository.create({
            rowId: row.id,
            type: SeatType.REGULAR,
            seatRow: row.rowNum,
            seatCol: i + 1,
          });
        }
      }
      return CinemaHallResponseDto.plainToClass(cinemaHall);
    } catch (error) {
      throw error;
    }
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
