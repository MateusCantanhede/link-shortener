import { ApiProperty } from '@nestjs/swagger';

export class GetOriginalByShortUrlQueries {
  @ApiProperty()
  shortenedUrl: string;
}
