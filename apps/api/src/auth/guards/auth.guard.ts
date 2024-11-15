import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const jwtPayload = await this.jwtService.verifyAsync(token);
      request.user = {
        userId: jwtPayload.sub,
        username: jwtPayload.username,
      };
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
