import { CreateAddressBody } from './create-address-body.dto';

export interface UpdateAddressBody extends Partial<CreateAddressBody> {
  userId?: number;
  cinemaId?: number;
}
