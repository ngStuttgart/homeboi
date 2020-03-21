import { Signup } from '@homeboi/api-interfaces';
import { Booking } from './booking';

export interface Rating {
  user: Signup;
  value: RatingValue;
  date: Date;
  booking: Booking;
  description: string;
}

export enum RatingValue {
  BEST = 5,
  GOOD = 4,
  NEUTRAL = 3,
  BAD = 2,
  WORST = 1
}
