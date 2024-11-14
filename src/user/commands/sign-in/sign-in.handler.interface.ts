import { User } from '../../entities/user.entity';
import { AccessTokenDTO } from './sign-in-access-token.dto';

export interface ISignInHandler {
  execute(email: string, password: string): Promise<AccessTokenDTO>;
}
