import { Controller, Post, Body, Inject } from '@nestjs/common';
import { SignUpCommand } from './sign-up.command';
import { ISignUpHandler } from './sign-up.handler.interface';
@Controller('users')
export class SignUpController {
  constructor(
    @Inject('ISignUpHandler')
    private readonly handler: ISignUpHandler,
  ) {}

  @Post('sign-up')
  create(@Body() command: SignUpCommand) {
    return this.handler.execute(command.email, command.password);
  }
}
