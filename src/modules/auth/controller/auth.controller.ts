import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRegistrationDto } from 'src/modules/user/dto/registration.dto';
import { UserLoginDto } from 'src/modules/user/dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registration(
    @Body() userRegistration: UserRegistrationDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { message, data, token } = await this.authService.registration(
      userRegistration,
    );
    response.cookie('USER_ACCESS_TOKEN', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message, data, token };
  }

  @Post('login')
  async login(
    @Body() userRegistration: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, token, message } = await this.authService.login(
      userRegistration,
    );
    response.cookie('USER_ACCESS_TOKEN', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message, data, token };
  }
}
