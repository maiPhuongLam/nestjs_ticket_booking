import { BadRequestException, Injectable } from '@nestjs/common';
import { MovieRepository } from './repositories/movie.repository';
import { CreateMovieDto } from './dto';
import { MovieResponseDto } from './dto/movie-response.dto';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async createMovie(
    adminId: number,
    createMovieDto: CreateMovieDto,
  ): Promise<MovieResponseDto> {
    try {
      const movie = await this.movieRepository.create({
        ...createMovieDto,
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
