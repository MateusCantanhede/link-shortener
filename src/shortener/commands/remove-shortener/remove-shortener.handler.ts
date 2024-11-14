import { Shortener } from '../../entities/shortener.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRemoveShortenerHandler } from './remove-shortener.handler.interface';

@Injectable()
export class RemoveShortenerHandler implements IRemoveShortenerHandler {
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
  ) {}

  async execute(id: string): Promise<Shortener> {
    const shortener = await this.shortenerRepository.findOne({
      where: { id: id },
    });
    shortener.deletedAt = new Date().toUTCString();
    await this.shortenerRepository.update(id, shortener);
    return await this.shortenerRepository.save(shortener);
  }
}
