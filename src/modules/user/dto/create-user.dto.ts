import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserBody } from '../interfaces/user.interface';
import { UserStatus } from '@prisma/client';

export class CreateUserDto implements CreateUserBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 26)
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserStatus)
  status: UserStatus;

  @IsOptional()
  rt?: string;
}
