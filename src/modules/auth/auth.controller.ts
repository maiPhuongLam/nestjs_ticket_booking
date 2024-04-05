import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CurrentUser, CurrentUserId } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerice: AuthService) {}

  @Post('local/register')
  @HttpCode(HttpStatus.CREATED)
  async registerLocal(@Body() reigsterDto: RegisterDto) {
    return this.authSerice.registerLocal(reigsterDto);
  }

  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async loginLocal(@Body() loginDto: LoginDto) {
    return this.authSerice.loginLocal(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const user = req.user
    return this.authSerice.logout(user['sub']);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @CurrentUserId() userId: number,
    @CurrentUser('refresh_Token') refreshToken: string,
  ) {
    return this.authSerice.refreshToken(userId, refreshToken);
  }
}
