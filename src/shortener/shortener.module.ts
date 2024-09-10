import { Module } from '@nestjs/common';
import { CreateShortenerController } from './commands/create-shortener/create-shortener.controller';
import { CreateShortenerHandler } from './commands/create-shortener/create-shortener.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortener } from './entities/shortener.entity';
import { UpdateOriginalUrlHandler } from './commands/update-original-link/update-original-url.handler';
import { GetOriginalByShortUrlHandler } from './queries/get-original-by-short-url/get-original-by-short-url.handler';
import { UpdateShortenerController } from './commands/update-original-link/update-shortener.controller';
import { GetOriginalByShortUrlController } from './queries/get-original-by-short-url/get-original-by-short-url.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shortener])],
  controllers: [
    CreateShortenerController,
    UpdateShortenerController,
    GetOriginalByShortUrlController,
  ],
  providers: [
    {
      provide: 'ICreateShortenerHandler',
      useClass: CreateShortenerHandler,
    },
    {
      provide: 'IGetOriginalUrlBySHortUrlHandler',
      useClass: GetOriginalByShortUrlHandler,
    },
    {
      provide: 'IUpdateOriginalUrlHandler',
      useClass: UpdateOriginalUrlHandler,
    },
  ],
})
export class ShortenerModule {}
