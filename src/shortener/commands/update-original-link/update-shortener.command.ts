import { ApiProperty } from '@nestjs/swagger';

export class UpdateShortenerCommand {
  @ApiProperty()
  originalUrl?: string;
}
