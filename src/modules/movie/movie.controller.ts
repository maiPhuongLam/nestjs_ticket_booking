import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
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
  async addMovie(
    @CurrentUserId() userId: number,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    return await this.movieService.createMovie(userId, createMovieDto);
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    return await this.movieService.getMovie(+id);
  }

  @Patch(':id/thumbnail')
  async uploadMovieThumnail(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.movieService.uploadMovieThumnail(+id, file);
  }
}
