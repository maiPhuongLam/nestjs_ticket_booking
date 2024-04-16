import { PaymentStatus } from "@prisma/client"

export interface ICreatePaymentBody {
  amount: number
  paymentStatus: PaymentStatus
  transactionId: number
  bookingId: number
}