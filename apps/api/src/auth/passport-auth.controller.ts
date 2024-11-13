import {
  Controller,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { PassportLocalGuard } from './guard/passport-local.guard';
import { AuthService } from './auth.service';
import { PassportJwtGuard } from './guard/passport-jwt.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @Get('me')
  @UseGuards(PassportJwtGuard)
  getUserInfo(@Request() request) {
    return request.user;
  }
}
