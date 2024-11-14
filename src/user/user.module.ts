import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { GetAllShortenerHandler } from '../shortener/queries/get-all-shortener-url/get-all-shortener-url.handler';
import { GetAllShortenerController } from '../shortener/queries/get-all-shortener-url/get-all-shortener-url.controller';
import { Shortener } from 'src/shortener/entities/shortener.entity';
import { SignUpHandler } from './commands/sign-up/sign-up.handler';
import { SignUpController } from './commands/sign-up/sign-up.controller';
import { SignInController } from './commands/sign-in/sign-in.controller';
import { SignInHandler } from './commands/sign-in/sign-in.handler';
import { JwtStrategy } from '../utils/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Shortener]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // Configura o tempo de expiração do token
    }),
  ],
  controllers: [SignUpController, SignInController],
  providers: [
    {
      provide: 'ISignUpHandler',
      useClass: SignUpHandler,
    },
    {
      provide: 'ISignInHandler',
      useClass: SignInHandler,
    },
    JwtStrategy,
  ],
})
export class UserModule {}
