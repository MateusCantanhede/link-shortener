import { ApiProperty } from '@nestjs/swagger';

export class CreateShortenerCommand {
  @ApiProperty()
  originalUrl: string;
}
