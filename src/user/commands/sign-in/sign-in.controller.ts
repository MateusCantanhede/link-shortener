import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ISignInHandler } from './sign-in.handler.interface';
import { SignInCommand } from './sign-in.command';
@Controller('users')
export class SignInController {
  constructor(
    @Inject('ISignInHandler')
    private readonly handler: ISignInHandler,
  ) {}

  @Post('sign-in')
  signIn(@Body() command: SignInCommand) {
    return this.handler.execute(command.email, command.password);
  }
}
