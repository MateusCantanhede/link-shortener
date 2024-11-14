import { User } from '../../entities/user.entity';

export interface ISignUpHandler {
  execute(email: string, password: string): Promise<User>;
}
