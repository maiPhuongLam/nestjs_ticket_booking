import { Injectable } from '@nestjs/common';
import { Prisma, User, UserStatus } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserBody, UpdateUserBody } from '../interfaces';

@Injectable()
export class UserRepository {
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
        address_id: true,
        status: true,
        rt: true,
        created_at: true,
        updated_at: true,
        admin: true,
        customer: true,
        front_desk_officer: true,
      },
    });
  }

  findById(id: number): Promise<User | null> {
    return this.repository.findUnique({ where: { id } });
  }

  creat(data: CreateUserBody): Promise<User | null> {
    return this.repository.create({
      data: { ...data, status: UserStatus.ACTIVE },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        password: true,
        address_id: true,
        status: true,
        rt: true,
        created_at: true,
        updated_at: true,
        admin: true,
        customer: true,
        front_desk_officer: true,
      },
    });
  }

  update(id: number, data: UpdateUserBody): Promise<User> {
    return this.repository.update({ where: { id }, data });
  }

  delete(id): Promise<User> {
    return this.repository.delete(id);
  }
}
