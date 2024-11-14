import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { ISignUpHandler } from './sign-up.handler.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SignUpHandler implements ISignUpHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(email: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create(new User(email, hashedPassword));
    return await this.userRepository.save(user);
  }
}
