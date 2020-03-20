import { Credentials } from '@homeboi/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPostDto implements Credentials {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
