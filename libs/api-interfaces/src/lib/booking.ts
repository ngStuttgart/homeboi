import { Product } from './product';

export interface Booking {
  id?: string;
  start: Date;
  end: Date;
  product?: Product
}
