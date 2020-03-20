import { ApiProperty } from '@nestjs/swagger';

export class AccountTypeDto {
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
