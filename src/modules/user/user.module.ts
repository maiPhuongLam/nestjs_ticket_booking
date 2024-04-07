import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { AdminRepository } from './repositories/admin.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { FdoRepository } from './repositories/fdo.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    AdminRepository,
    CustomerRepository,
    FdoRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
