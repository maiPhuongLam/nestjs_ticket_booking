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
  address_id: number | null;
  status: UserStatus;
  rt: string | null;
  admin?: Admin;
  customer?: Customer;
  front_desk_officer?: FrontDeskOfficer;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}
