import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class FaviconMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    if (req.url === '/favicon.ico') {
      // Ignora a requisição de favicon e retorna 204 sem conteúdo
      res.status(204).send();
    } else {
      // Continua o processamento para outras requisições
      next();
    }
  }
}
