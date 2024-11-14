import { Shortener } from '../../entities/shortener.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUpdateOriginalUrlHandler } from './update-original-link.handler.interface';

@Injectable()
export class UpdateOriginalUrlHandler implements IUpdateOriginalUrlHandler {
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
  ) {}

  async execute(id: string, originalUrl: string): Promise<Shortener> {
    const shortener = await this.shortenerRepository.findOne({
      where: { id: id },
    });
    shortener.originalUrl = originalUrl;
    shortener.updateAt = new Date().toUTCString();
    await this.shortenerRepository.update(id, shortener);
    return await this.shortenerRepository.save(shortener);
  }
}
