import { Payment } from "@prisma/client";
import { ICreatePaymentBody } from "./create-payment-body.interface";

export interface IPaymentRepository {
  create(data: ICreatePaymentBody): Promise<Payment>
  findById(id: number): Promise<Payment>
  findByBookingId(bookingId: number): Promise<Payment>
  find(): Promise<Payment[]>
  update(id: number, data: Partial<ICreatePaymentBody>): Promise<Payment>
  delete(id: number): Promise<Payment>
}