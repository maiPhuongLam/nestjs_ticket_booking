import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { Admin, Customer, FrontDeskOfficer, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminRepository } from './repositories/admin.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { FdoRepository } from './repositories/fdo.repository';
import { UserRoles } from './enums';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly fdoRepository: FdoRepository,
  ) {}

  async findUserExist(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
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

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const { role, ...res } = createUserDto;

      const user = await this.userRepository.creat(res);

      if (!user) {
        throw new BadRequestException();
      }

      await this.createRole(user.id, role);

      return UserResponseDto.plainToClass(user);
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

  async createRole(
    id: number,
    role: UserRoles,
  ): Promise<Admin | Customer | FrontDeskOfficer> {
    try {
      const user = await this.getUser(id);
      let result: any;

      switch (role) {
        case UserRoles.ADMIN:
          result = await this.adminRepository.create(user.id);
          break;
        case UserRoles.CUSTOMER:
          result = await this.customerRepository.create(user.id);
          break;
        case UserRoles.FRONT_DESK_OFFICER:
          result = await this.fdoRepository.create(user.id);
          break;
        default:
          throw new BadRequestException('Invalid role');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  checkRole(user: UserResponseDto): UserRoles {
    if (user.admin) {
      return UserRoles.ADMIN;
    } else if (user.customer) {
      return UserRoles.CUSTOMER;
    } else {
      return UserRoles.FRONT_DESK_OFFICER;
    }
  }

  async getIdOfUserRole(userId: number, role: UserRoles): Promise<number> {
    try {
      switch (role) {
        case UserRoles.ADMIN:
          return (await this.adminRepository.findByUserId(userId)).id;
        case UserRoles.CUSTOMER:
          return (await this.customerRepository.findByUserId(userId)).id;
        case UserRoles.FRONT_DESK_OFFICER:
          return (await this.fdoRepository.findByUserId(userId)).id;
        default:
          throw new BadRequestException();
      }
    } catch (error) {
      throw error;
    }
  }
}
