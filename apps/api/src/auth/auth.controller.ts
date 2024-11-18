import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() input: { username: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const authReslut = await this.authService.authenticate(input);
    response.cookie('user_token', authReslut.accessToken, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      sameSite: 'strict',
    });
    return authReslut;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('user_token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: 'strict',
    });
    return { message: 'Logout successfully' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getUserInfo(@Request() request) {
    return request.user;
  }
}
