import { BadRequestException, Injectable } from '@nestjs/common';
import { MovieRepository } from './repositories/movie.repository';
import { CreateMovieDto } from './dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/enums';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly userService: UserService,
  ) {}

  async createMovie(
    userId: number,
    createMovieDto: CreateMovieDto,
  ): Promise<MovieResponseDto> {
    try {
      const adminId = await this.userService.getIdOfUserRole(
        userId,
        UserRoles.ADMIN,
      );
      const movie = await this.movieRepository.create({
        ...createMovieDto,
        release_date: new Date(createMovieDto.release_date),
        admin_id: adminId,
      });

      if (!movie) {
        throw new BadRequestException();
      }

      return MovieResponseDto.plainToClass(movie);
    } catch (error) {
      throw error;
    }
  }
}
