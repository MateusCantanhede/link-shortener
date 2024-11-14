import { Shortener } from 'src/shortener/entities/shortener.entity';

export interface IGetAllShortenerHandler {
  execute(userId: string): Promise<Shortener[]>;
}
