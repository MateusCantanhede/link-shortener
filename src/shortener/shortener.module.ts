import { Module } from '@nestjs/common';
import { CreateShortenerController } from './commands/create-shortener/create-shortener.controller';
import { CreateShortenerHandler } from './commands/create-shortener/create-shortener.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortener } from './entities/shortener.entity';
import { UpdateOriginalUrlHandler } from './commands/update-original-link/update-original-url.handler';
import { GetOriginalByShortUrlHandler } from './queries/get-original-by-short-url/get-original-by-short-url.handler';
import { UpdateShortenerController } from './commands/update-original-link/update-shortener.controller';
import { GetOriginalByShortUrlController } from './queries/get-original-by-short-url/get-original-by-short-url.controller';
import { RemoveShortenerHandler } from './commands/remove-shortener/remove-shortener.handler';
import { RemoveShortenerController } from './commands/remove-shortener/remove-shortener.controller';
import { GetAllShortenerHandler } from './queries/get-all-shortener-url/get-all-shortener-url.handler';
import { GetAllShortenerController } from './queries/get-all-shortener-url/get-all-shortener-url.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shortener, User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // Configura o tempo de expiração do token
    }),
  ],
  controllers: [
    CreateShortenerController,
    UpdateShortenerController,
    GetOriginalByShortUrlController,
    RemoveShortenerController,
    GetAllShortenerController,
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
    {
      provide: 'IRemoveShortenerHandler',
      useClass: RemoveShortenerHandler,
    },
    {
      provide: 'IGetAllShortenerHandler',
      useClass: GetAllShortenerHandler,
    },
  ],
})
export class ShortenerModule {}
