import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto';
import { RolesGuard } from 'src/common/guards';
import { CurrentUser, CurrentUserId, Roles } from 'src/common/decorators';
import { UserRoles } from '../user/enums';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Post()
  async create(
    @CurrentUserId() userId: number,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    return this.movieService.createMovie(userId, createMovieDto);
  }
}
