import { CreateAddressBody } from './create-address-body.dto';

export interface UpdateAddressBody extends Partial<CreateAddressBody> {
  user_id?: number;
  cinema_id?: number;
}
