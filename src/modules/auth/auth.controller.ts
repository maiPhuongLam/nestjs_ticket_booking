import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto';

import { CurrentUser, CurrentUserId } from 'src/common/decorators';
import { Public } from 'src/common/decorators/public.decorator';
import { AcessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { AccessStrategy } from './strategies';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerice: AuthService) {}

  @Public()
  @Post('local/register')
  @HttpCode(HttpStatus.CREATED)
  async registerLocal(@Body() reigsterDto: RegisterDto) {
    return this.authSerice.registerLocal(reigsterDto);
  }

  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async loginLocal(@Body() loginDto: LoginDto) {
    return this.authSerice.loginLocal(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUserId() userId: number) {
    return this.authSerice.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @CurrentUserId() userId: number,
    @CurrentUser('refresh_token') refreshToken: string,
  ) {
    return this.authSerice.refreshToken(userId, refreshToken);
  }
}
