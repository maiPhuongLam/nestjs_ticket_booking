import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ShowRepository } from './repositories/show.repository';
import { UserModule } from '../user/user.module';
import { ShowSeatRepository } from './repositories';
import { CinemaModule } from '../cinema/cinema.module';

@Module({
  imports: [PrismaModule, UserModule, CinemaModule],
  controllers: [ShowController],
  providers: [ShowService, ShowRepository, ShowSeatRepository],
})
export class ShowModule {}
