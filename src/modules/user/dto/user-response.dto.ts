import {
  Admin,
  Customer,
  FrontDeskOfficer,
  Movie,
  UserStatus,
} from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class UserResponseDto extends BaseDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  @Exclude()
  password: string;
  addressId: number | null;
  status: UserStatus;
  rt: string | null;
  admin?: Admin;
  customer?: Customer;
  frontDeskOfficer?: FrontDeskOfficer;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
