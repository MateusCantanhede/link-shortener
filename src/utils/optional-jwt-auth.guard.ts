import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // Retorna `null` em vez de lançar uma exceção se a autenticação falhar
    if (err || !user) {
      return null;
    }
    return user;
  }
}
