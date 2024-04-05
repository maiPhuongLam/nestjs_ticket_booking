import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessStrategy, RefreshStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    UserModule,
  ],
  providers: [AuthService, JwtService, AccessStrategy, RefreshStrategy, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
