import {
  Controller,
  Get,
  Inject,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IGetOriginalUrlBySHortUrlHandler } from './get-original-by-short-url.handler.interface';
import { FastifyReply } from 'fastify';
import { OptionalJwtAuthGuard } from '../../../utils/optional-jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Protected')
@ApiBearerAuth('access-token')
export class GetOriginalByShortUrlController {
  constructor(
    @Inject('IGetOriginalUrlBySHortUrlHandler')
    private readonly handler: IGetOriginalUrlBySHortUrlHandler,
  ) {}

  @Get(':shortenedUrl')
  @UseGuards(OptionalJwtAuthGuard) // Aplica o guard opcional
  async findOne(
    @Req() request: any,
    @Param('shortenedUrl') shortenedUrl: string,
    @Res() reply: FastifyReply,
  ) {
    const hostHeader = request.headers['x-forwarded-host'];
    const proxyHost = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
    const host = proxyHost || request.hostname;
    const protocol = request.protocol;
    const fullURL = `${protocol}://${host}/${shortenedUrl}`;
    const userId = request?.user?.id;
    console.log('fullURL', fullURL);
    const shortener = await this.handler.execute(fullURL, userId);
    reply.status(301).header('Location', shortener.originalUrl).send();
  }
}
