import { Signup } from '@homeboi/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto';

export class UserPostDto implements Omit<Signup, 'accountType'> {
  @ApiProperty({ enum: ['USER', 'COMPANY']})
  accountType: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: AddressDto;

  @ApiProperty()
  contactPerson?: string;
}
