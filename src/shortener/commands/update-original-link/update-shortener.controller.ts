import {
  Controller,
  Body,
  Patch,
  Param,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { UpdateShortenerCommand } from './update-shortener.command';
import { IUpdateOriginalUrlHandler } from './update-original-link.handler.interface';
import { JwtAuthGuard } from '../../../utils/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Protected')
@ApiBearerAuth('access-token')
export class UpdateShortenerController {
  constructor(
    @Inject('IUpdateOriginalUrlHandler')
    private readonly handler: IUpdateOriginalUrlHandler,
  ) {}

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota com o guard JWT
  update(@Param('id') id: string, @Body() command: UpdateShortenerCommand) {
    return this.handler.execute(id, command.originalUrl);
  }
}
