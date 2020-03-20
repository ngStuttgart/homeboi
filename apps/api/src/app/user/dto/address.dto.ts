import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  streetNumber: string;

  @ApiProperty()
  country: string;
}
