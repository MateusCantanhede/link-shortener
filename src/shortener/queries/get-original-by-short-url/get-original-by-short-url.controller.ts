import { Controller, Get, Inject, Param, Req, Res } from '@nestjs/common';
import { IGetOriginalUrlBySHortUrlHandler } from './get-original-by-short-url.handler.interface';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class GetOriginalByShortUrlController {
  constructor(
    @Inject('IGetOriginalUrlBySHortUrlHandler')
    private readonly handler: IGetOriginalUrlBySHortUrlHandler,
  ) {}

  @Get(':shortenedUrl')
  async findOne(
    @Req() request: FastifyRequest,
    @Param('shortenedUrl') shortenedUrl: string,
    @Res() reply: FastifyReply,
  ) {
    const hostHeader = request.headers['x-forwarded-host'];
    const proxyHost = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
    const host = proxyHost || request.hostname;
    const protocol = request.protocol;
    const fullURL = `${protocol}://${host}/${shortenedUrl}`;
    console.log('fullURL', fullURL);
    const shortener = await this.handler.execute(fullURL);
    reply.status(301).header('Location', shortener.originalUrl).send();
  }
}
