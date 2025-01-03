import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CurrentUserId, Public, Roles } from 'src/common/decorators';
import { RolesGuard } from 'src/common/guards';
import { UserRoles } from '../user/enums';
import { CreateShowDto } from './dto';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @UseGuards(RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Post()
  async addShow(
    @CurrentUserId() userId: number,
    @Body() createShowDto: CreateShowDto,
  ) {
    return await this.showService.creatShow(userId, createShowDto);
  }

  @Public()
  @Get(':id')
  async getShow(@Param('id') id: string) {
    return await this.showService.getShow(+id);
  }

  @Public()
  @Get()
  async getShows(
    @Query('movieTitle') movieTitle?: string,
    @Query('cinemaId') cinemaId?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    const filter = {
      ...(movieTitle && { movieTitle }),
      ...(cinemaId && { cinemaId: +cinemaId }),
      ...(cinemaId && { limit: +limit }),
      ...(cinemaId && { page: +page }),
      ...(orderBy && { orderBy }),
    };
    return await this.showService.getShows(filter);
  }
}
