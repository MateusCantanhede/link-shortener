import { Shortener } from '../../entities/shortener.entity';
import { ICreateShortenerHandler } from './create-shortener.handler.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'node:crypto';
import { User } from '../../../user/entities/user.entity';

@Injectable()
export class CreateShortenerHandler implements ICreateShortenerHandler {
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(
    protocol: string,
    host: string,
    originalUrl: string,
    userId?: string,
  ): Promise<Shortener> {
    //transformar original em short
    const code = this.generateShortUrl(originalUrl);
    const shortUrl = `${protocol}://${host}/${code}`;
    const shortener = new Shortener(originalUrl, shortUrl, 0);
    if (userId) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      shortener.user = user;
    }
    this.shortenerRepository.create(shortener);
    return await this.shortenerRepository.save(shortener);
  }
  private generateShortUrl(originalUrl) {
    // Gerar um hash da URL usando SHA-256
    const hash = crypto.createHash('sha256').update(originalUrl).digest('hex');
    // Pegar os primeiros 6 caracteres do hash
    return hash.substring(0, 6);
  }
}
