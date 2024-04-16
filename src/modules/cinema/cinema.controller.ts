import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto, CreateCinemaHallDto, UpdateCinamaDto } from './dto';
import { SeatType } from '@prisma/client';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post(':id/hall')
  async addHall(
    @Param('id') id: string,
    @Body() createCinemaHallDto: CreateCinemaHallDto,
  ) {
    console.log(createCinemaHallDto);

    return await this.cinemaService.addHallToCinema(+id, createCinemaHallDto);
  }

  @Post()
  async addCinema(@Body() createCinemaDto: CreateCinemaDto) {
    return await this.cinemaService.createCinema(createCinemaDto);
  }

  @Get(':id')
  async getCinema(@Param('id') id: string) {
    return await this.cinemaService.getCinema(+id);
  }

  @Get()
  async getAllCinema() {
    return await this.cinemaService.getAllCinemas();
  }

  @Patch(':id')
  async updateCinema(
    @Param('id') id: number,
    @Body() updateCinemaDto: UpdateCinamaDto,
  ) {
    return await this.cinemaService.updateCinema(id, updateCinemaDto);
  }

  @Delete(':id')
  async deleteCinema(@Param('id') id: string) {
    return await this.cinemaService.deleteCinema(+id);
  }
}
