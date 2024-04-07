import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserStatus } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
