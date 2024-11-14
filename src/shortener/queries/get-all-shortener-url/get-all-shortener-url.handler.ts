import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetAllShortenerHandler } from './get-all-shortener-url.handler.interface';
import { Shortener } from 'src/shortener/entities/shortener.entity';

@Injectable()
export class GetAllShortenerHandler implements IGetAllShortenerHandler {
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
  ) {}

  async execute(userId: string): Promise<Shortener[]> {
    return await this.shortenerRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }
}
