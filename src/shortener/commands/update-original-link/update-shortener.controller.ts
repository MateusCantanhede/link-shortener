import { Controller, Body, Patch, Param, Inject } from '@nestjs/common';
import { UpdateShortenerCommand } from './update-shortener.command';
import { IUpdateOriginalUrlHandler } from './update-original-link.handler.interface';

@Controller()
export class UpdateShortenerController {
  constructor(
    @Inject('IUpdateOriginalUrlHandler')
    private readonly handler: IUpdateOriginalUrlHandler,
  ) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() command: UpdateShortenerCommand) {
    return this.handler.execute(id, command.originalUrl);
  }
}
