import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MovieRepository } from './repositories/movie.repository';
import { CreateMovieDto } from './dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/enums';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
@Injectable()
export class MovieService {
  constructor(
    private configService: ConfigService,
    private readonly movieRepository: MovieRepository,
    private readonly userService: UserService,
  ) {
    cloudinary.v2.config({
      cloud_name: configService.get<string>('CLOUD_NAME'),
      api_key: configService.get<string>('API_KEY'),
      api_secret: configService.get<string>('API_SECRET'),
    });
  }

  async uploadMovieThumnail(
    id: number,
    file: Express.Multer.File,
  ): Promise<string> {
    try {
      const movie = await this.getMovie(id);
      if (movie.thumbnail_public_id) {
        await cloudinary.v2.uploader.destroy(movie.thumbnail_public_id, {
          invalidate: true,
        });
      }

      const res = await cloudinary.v2.uploader.upload(file.path, {
        folder: this.configService.get<string>('FOLDER_PATH'),
        public_id: `${this.configService.get<string>('PUBLIC_ID_PREFIX')}${Date.now()}`,
        transformation: [
          {
            width: '400',
            height: '600',
            crop: 'fill',
          },
          { quality: 'auto' },
        ],
      });
      fs.unlinkSync(file.path);
      await this.movieRepository.update(id, {
        thumbnail_public_id: res.public_id,
        thumbnail_url: res.secure_url,
      });
      return res.secure_url;
    } catch (error) {
      throw error;
    }
  }

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

  async getMovie(id: number): Promise<MovieResponseDto> {
    try {
      const movie = await this.movieRepository.findById(id);

      if (!movie) {
        throw new NotFoundException('Movie not found');
      }
      return MovieResponseDto.plainToClass(movie);
    } catch (error) {
      throw error;
    }
  }
}
