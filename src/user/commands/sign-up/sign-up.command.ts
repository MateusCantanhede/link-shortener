import { ApiProperty } from '@nestjs/swagger';

export class SignUpCommand {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
