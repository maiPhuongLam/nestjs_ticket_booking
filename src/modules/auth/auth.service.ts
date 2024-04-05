import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Token } from './interfaces/token.interface';
import { hash, validate } from 'src/common/utils';
import { LoginDto } from './dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async registerLocal(reigsterDto: RegisterDto): Promise<Token> {
    try {
      const userExist = await this.userService.findUserExist(reigsterDto.email);
      if (userExist) {
        throw new ConflictException('Email already use');
      } else {
        reigsterDto.password = await hash(reigsterDto.password);
        const user = await this.userService.createUser(reigsterDto);
        const token = await this.generateToken(user.id, user.email);
        await this.updateRefreshTokenHash(user.id, token.refresh_token);
        return token;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginLocal(loginDto: LoginDto): Promise<Token> {
    try {
      const { email, password } = loginDto;

      const user = await this.userService.findUserExist(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const matchPassword = await validate(password, user.password);
      if (!matchPassword) {
        throw new ForbiddenException('Password wrong');
      }

      const token = await this.generateToken(user.id, user.email);
      await this.updateRefreshTokenHash(user.id, token.refresh_token);

      return token;
    } catch (error) {
      throw error;
    }
  }
  async logout(userId: number): Promise<boolean> {
    try {
      const user = await this.userService.getUser(userId);
      if (!user.rt) {
        throw new ForbiddenException('User does not have a refresh token');
      }

      await this.userService.updateUser(userId, { rt: null });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(userId: number, refreshToken: string): Promise<Token> {
    try {
      const user = await this.userService.getUser(userId);

      if (!user.rt || !validate(refreshToken, user.rt)) {
        throw new ForbiddenException('Invalid or missing refresh token');
      }

      const token = await this.generateToken(user.id, user.email);
      await this.updateRefreshTokenHash(user.id, token.refresh_token);

      return token;
    } catch (error) {
      throw error;
    }
  }

  async generateToken(userId: number, email: string): Promise<Token> {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
        expiresIn: '1h',
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
        expiresIn: '7d',
      },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hashData = await hash(refreshToken);
    await this.userService.updateUser(userId, { rt: hashData });
  }
}
