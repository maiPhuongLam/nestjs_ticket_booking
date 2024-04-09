import { Injectable } from '@nestjs/common';
import { Address } from '@prisma/client';
import { AddressRepository } from './repositories/address.repository';
import { CreateAddressDto, UpdateAddressDto } from './dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getAllAddresses(): Promise<Address[]> {
    return this.addressRepository.findAll();
  }

  async getAddress(id: number): Promise<Address | null> {
    return this.addressRepository.findById(id);
  }

  async createAddress(data: CreateAddressDto): Promise<Address> {
    return this.addressRepository.create(data);
  }

  async updateAddress(
    id: number,
    data: UpdateAddressDto,
  ): Promise<Address | null> {
    return this.addressRepository.update(id, data);
  }

  async deleteAddress(id: number): Promise<Address | null> {
    return this.addressRepository.delete(id);
  }
}
