import { Shortener } from '../../entities/shortener.entity';

export interface IGetOriginalUrlBySHortUrlHandler {
  execute(shortenedUrl: string, userId?: string): Promise<Shortener>;
}
