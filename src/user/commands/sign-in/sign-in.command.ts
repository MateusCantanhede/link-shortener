import { ApiProperty } from '@nestjs/swagger';

export class SignInCommand {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
