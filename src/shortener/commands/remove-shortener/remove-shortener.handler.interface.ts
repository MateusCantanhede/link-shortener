import { Shortener } from '../../entities/shortener.entity';

export interface IRemoveShortenerHandler {
  execute(id: string): Promise<Shortener>;
}
