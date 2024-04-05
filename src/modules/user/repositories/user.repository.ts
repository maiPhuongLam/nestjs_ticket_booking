import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserBody, UpdateUserBody } from '../interfaces/user.interface';

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
    return this.repository.findUnique({ where: { email } });
  }

  findById(id: number): Promise<User | null> {
    return this.repository.findUnique({ where: { id } });
  }

  creat(data: CreateUserBody): Promise<User> {
    return this.repository.create({ data });
  }

  update(id: number, data: UpdateUserBody): Promise<User> {
    return this.repository.update({ where: { id }, data });
  }

  delete(id): Promise<User> {
    return this.repository.delete(id);
  }
}
