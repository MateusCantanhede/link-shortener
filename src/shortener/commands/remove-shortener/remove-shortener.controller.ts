import { Controller, Param, Inject, Delete, UseGuards } from '@nestjs/common';
import { IRemoveShortenerHandler } from './remove-shortener.handler.interface';
import { JwtAuthGuard } from '../../../utils/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Protected')
@ApiBearerAuth('access-token')
export class RemoveShortenerController {
  constructor(
    @Inject('IRemoveShortenerHandler')
    private readonly handler: IRemoveShortenerHandler,
  ) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.handler.execute(id);
  }
}
