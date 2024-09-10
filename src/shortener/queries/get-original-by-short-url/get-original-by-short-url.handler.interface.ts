import { Shortener } from '../../entities/shortener.entity';

export interface IGetOriginalUrlBySHortUrlHandler {
  execute(shortenedUrl: string): Promise<Shortener>;
}
