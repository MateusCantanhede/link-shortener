import { Shortener } from '../../entities/shortener.entity';

export interface ICreateShortenerHandler {
  execute(
    protocol: string,
    host: string,
    originalUrl: string,
    userId?: string,
  ): Promise<Shortener>;
}
