import { RatingValue } from '@homeboi/api-interfaces';

export interface RatingPostDto {
  value: RatingValue;
  description: string;
}
