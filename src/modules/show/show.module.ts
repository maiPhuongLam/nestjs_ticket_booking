import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ShowRepository } from './repositories/show.repository';
import { UserModule } from '../user/user.module';
import { ShowSeatRepository } from './repositories';

@Module({
  imports: [PrismaModule, UserModule, ],
  controllers: [ShowController],
  providers: [ShowService, ShowRepository, ShowSeatRepository],
  exports: [ShowService]
})
export class ShowModule {}
