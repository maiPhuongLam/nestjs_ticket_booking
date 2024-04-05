import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserExist(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.creat(createUserDto);
      if (!user) {
        throw new BadRequestException();
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userExist = await this.getUser(id);
      return await this.userRepository.update(userExist.id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }
}
