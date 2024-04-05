import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateAddressDto) {}
