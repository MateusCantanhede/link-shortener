import { User } from '../../entities/user.entity';
import { ISignInHandler } from './sign-in.handler.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessTokenDTO } from './sign-in-access-token.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SignInHandler implements ISignInHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(email: string, password: string): Promise<AccessTokenDTO> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials1');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials password nao bate');
    }

    const payload = { id: user.id, email: user.email };
    const expiresIn = 3600; // 1 hora em segundos
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    });
    console.log('accesstoken--->' + accessToken);
    return {
      accessToken,
      expiresIn,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
