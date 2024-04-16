import { Injectable } from "@nestjs/common";
import { ICreateCreditCardTransactionBody, ICreditCardTransactionRepository } from "../interfaces";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreditCardTransaction } from "@prisma/client";

@Injectable()
export class CreditCardTransactionRepository implements ICreditCardTransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  private get repository() {
    return this.prismaService.creditCardTransaction
  }

  async create(data: ICreateCreditCardTransactionBody): Promise<CreditCardTransaction> {
    return await this.repository.create({ data })
  }
  async update(id: any, data: Partial<ICreateCreditCardTransactionBody>): Promise<CreditCardTransaction> {
    return await this.repository.update({ where: { id }, data })
  }
  
}