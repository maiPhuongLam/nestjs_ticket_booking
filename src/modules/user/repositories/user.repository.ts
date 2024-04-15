import { Injectable } from '@nestjs/common';
import { $Enums, Prisma, User, UserStatus } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  ICreateUserBody,
  IUpdateUserBody,
  IUserRepository,
} from '../interfaces';

@Injectable()
export class UserRepository implements IUserRepository {
  private repository: Prisma.UserDelegate;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.user;
  }

  find(): Promise<User[]> {
    return this.repository.findMany();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        password: true,
        addressId: true,
        status: true,
        rt: true,
        createdAt: true,
        updatedAt: true,
        admin: true,
        customer: true,
        frontDeskOfficer: true,
      },
    });
  }

  findById(id: number): Promise<User | null> {
    return this.repository.findUnique({ where: { id } });
  }

  create(data: ICreateUserBody): Promise<User | null> {
    return this.repository.create({
      data: { ...data, status: UserStatus.ACTIVE },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        password: true,
        addressId: true,
        status: true,
        rt: true,
        createdAt: true,
        updatedAt: true,
        admin: true,
        customer: true,
        frontDeskOfficer: true,
      },
    });
  }

  update(id: number, data: IUpdateUserBody): Promise<User> {
    return this.repository.update({ where: { id }, data });
  }

  delete(id): Promise<User> {
    return this.repository.delete(id);
  }
}
