import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { PaymentMethod } from "../enums/payment-method.enum";

export class CreatepaymentDto {
  @IsNotEmpty()
  @IsInt()
  bookingId: number

  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod

  @IsNotEmpty()
  @IsString()
  nameOnCard?: string
}