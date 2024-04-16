import { CreditCardTransaction } from "@prisma/client";
import { ICreateCreditCardTransactionBody } from "./create-credit-card-transaction-body.interface";

export interface ICreditCardTransactionRepository {
  create(data: ICreateCreditCardTransactionBody): Promise<CreditCardTransaction>
  update(id, data: Partial<ICreateCreditCardTransactionBody>): Promise<CreditCardTransaction>
}