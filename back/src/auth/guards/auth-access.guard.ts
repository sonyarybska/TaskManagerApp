import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthHelper } from '../../helpers/AuthHelper';

@Injectable()
export class AuthAccessGuard implements CanActivate {
  constructor(private authHelper: AuthHelper) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<any>();
    if (!request.headers.authorization) {
      throw new ForbiddenException('Token is missing');
    }

    const accessToken = request.headers.authorization.split(' ')[1];

    if (!accessToken) {
      throw new ForbiddenException('Token is missing');
    }

    const isValid = this.authHelper.verifyToken(accessToken);

    if (isValid) {
      return true;
    }

    throw new ForbiddenException('Token is missing');
  }
}
