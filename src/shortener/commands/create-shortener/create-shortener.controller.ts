import { Controller, Post, Body, Inject, Req, UseGuards } from '@nestjs/common';
import { CreateShortenerCommand } from './create-shortener.command';
import { ICreateShortenerHandler } from './create-shortener.handler.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../../../utils/optional-jwt-auth.guard';
@Controller()
@ApiTags('Protected')
@ApiBearerAuth('access-token')
export class CreateShortenerController {
  constructor(
    @Inject('ICreateShortenerHandler')
    private readonly handler: ICreateShortenerHandler,
  ) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  create(@Req() request: any, @Body() command: CreateShortenerCommand) {
    const hostHeader = request.headers['x-forwarded-host'];
    const proxyHost = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
    const host = proxyHost || request.hostname;
    const protocol = request.protocol;
    const userId = request?.user?.id;
    console.log('creating shortener command' + userId);
    return this.handler.execute(protocol, host, command.originalUrl, userId);
  }
}
