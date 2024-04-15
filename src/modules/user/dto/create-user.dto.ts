import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ICreateUserBody } from '../interfaces/creat-user-body.interface';
import { UserRoles } from '../enums';

export class CreateUserDto implements ICreateUserBody {
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

  @IsOptional()
  rt?: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;
}
