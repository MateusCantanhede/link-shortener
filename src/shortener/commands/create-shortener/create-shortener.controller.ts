import { Controller, Post, Body, Inject, Req } from '@nestjs/common';
import { CreateShortenerCommand } from './create-shortener.command';
import { ICreateShortenerHandler } from './create-shortener.handler.interface';
import { FastifyRequest } from 'fastify';
@Controller()
export class CreateShortenerController {
  constructor(
    @Inject('ICreateShortenerHandler')
    private readonly handler: ICreateShortenerHandler,
  ) {}

  @Post()
  create(
    @Req() request: FastifyRequest,
    @Body() command: CreateShortenerCommand,
  ) {
    const hostHeader = request.headers['x-forwarded-host'];
    const proxyHost = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
    const host = proxyHost || request.hostname;
    const protocol = request.protocol;
    return this.handler.execute(protocol, host, command.originalUrl);
  }
}
