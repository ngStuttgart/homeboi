import { Booking } from '@homeboi/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class BookingPostDto implements Booking {
  @ApiProperty()
  end: Date;
  @ApiProperty()
  start: Date;
  @ApiProperty()
  productId: string;
}
