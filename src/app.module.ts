import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './modules/address/address.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AcessTokenGuard } from './common/guards';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { MovieModule } from './modules/movie/movie.module';
import { ShowModule } from './modules/show/show.module';
import { CinemaModule } from './modules/cinema/cinema.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    AddressModule,
    MovieModule,
    ShowModule,
    CinemaModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AcessTokenGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
