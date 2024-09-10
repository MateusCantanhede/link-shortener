import { Shortener } from '../../entities/shortener.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetOriginalUrlBySHortUrlHandler } from './get-original-by-short-url.handler.interface';

@Injectable()
export class GetOriginalByShortUrlHandler
  implements IGetOriginalUrlBySHortUrlHandler
{
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
  ) {}

  async execute(shortenedUrl: string): Promise<Shortener> {
    const shortener = await this.shortenerRepository.findOne({
      where: { shortenedUrl: shortenedUrl },
    });
    //atualizar clicks
    if (shortener) {
      shortener.clicks = shortener.clicks + 1;
    } else {
      throw new Error('shortener not found');
    }
    await this.shortenerRepository.update(shortener.id, shortener);
    return shortener;
  }
}
