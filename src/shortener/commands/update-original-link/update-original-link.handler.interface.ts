import { Shortener } from '../../entities/shortener.entity';

export interface IUpdateOriginalUrlHandler {
  execute(id: string, originalUrl: string): Promise<Shortener>;
}
