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
    const authCookie = request.cookies['user_token'];

    if (!authCookie) {
      throw new UnauthorizedException('Authorization cookie is required');
    }

    try {
      const jwtPayload = await this.jwtService.verifyAsync(authCookie);
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
