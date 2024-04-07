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
import { CurrentUser, CurrentUserId, Public } from 'src/common/decorators';
import { RefreshTokenGuard } from 'src/common/guards';
import { UserRoles } from '../user/enums';

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
    @CurrentUser('role') role: UserRoles,
  ) {
    return this.authSerice.refreshToken(userId, refreshToken, role);
  }
}
