import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { IGetAllShortenerHandler } from './get-all-shortener-url.handler.interface';
import { JwtAuthGuard } from '../../../utils/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Protected')
@ApiBearerAuth('access-token')
export class GetAllShortenerController {
  constructor(
    @Inject('IGetAllShortenerHandler')
    private readonly handler: IGetAllShortenerHandler,
  ) {}

  @Get('shortened-urls')
  @UseGuards(JwtAuthGuard) // Protege a rota com o guard JWT
  async findAll(@Req() request: any) {
    const userId = request.user.id;
    console.log('Get All Shortener URL' + userId);
    return await this.handler.execute(userId);
  }
}
