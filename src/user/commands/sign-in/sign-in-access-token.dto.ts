import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDTO {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  expiresIn: number;
  @ApiProperty()
  user: {
    id: string;
    email: string;
  };
}
