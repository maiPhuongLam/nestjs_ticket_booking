import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Token } from './interfaces/token.interface';
import { hash, validate } from 'src/common/utils';
import { LoginDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async registerLocal(reigsterDto: RegisterDto): Promise<Token> {
    try {
      const userExist = await this.userService.findUserExist(reigsterDto.email)
      if (!userExist) {
        reigsterDto.password = await hash(reigsterDto.password)
        const user = await this.userService.createUser(reigsterDto);
        const token = await this.getToken(user.id, user.email)
        await this.updateRefreshTokenHash(user.id, token.refresh_token)
        return token
      } else {
        throw new ConflictException('Email already use')
      }
    } catch (error) {
      throw error
    }
  }
  async loginLocal(loginDto: LoginDto): Promise<Token> {
    try {
      const user = await this.userService.findUserExist(loginDto.email)
      
      if (user) {
        const matchPassword = await validate(loginDto.password, user.password)
        if (!matchPassword) {
          const token = await this.getToken(user.id, user.email)
          await this.updateRefreshTokenHash(user.id, token.refresh_token)
          return token
        }
        throw new ForbiddenException('Password wrong')     
      } else {
        throw new NotFoundException('User not found')
      }
    } catch (error) {
      throw error
    }
  }
  async logout(userId: number): Promise<boolean> {
    try {
      const user = await this.userService.getUser(userId)
      if (user.rt) {
        await this.userService.updateUser(userId, { rt: null })
        return true
      } else {
        throw new ForbiddenException()
      }
    } catch (error) {
      throw error
    }
  }
  async refreshToken(userId: number, refreshToken: string): Promise<Token> {
    try {
      const user = await this.userService.getUser(userId)
      const matchRefreshToken = validate(refreshToken, user.rt)

      if (matchRefreshToken) {
        const token = await this.getToken(user.id, user.email);
        await this.updateRefreshTokenHash(user.id, token.refresh_token);
        return token;
      } else {
        throw new ForbiddenException()
      }
      
    } catch (error) {
      throw error
    }
  } 

  async getToken(userId: number, email: string): Promise<Token> {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      { secret: process.env.ACCESS_SECRET_KEY, expiresIn: '1h' },
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, email },
      { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '7d' },
    );
    return { access_token: accessToken, refresh_token: refreshToken}
  }


  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hashData = await hash(refreshToken)
    await this.userService.updateUser(userId, { rt: hashData })
  }
}
