import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginUser: LoginUserDto, @Res() res: any) {
    try {
      const access_token = await this.authService.login(loginUser);
      res.json({ ...loginUser, ...access_token });
    } catch (e) {
      res.json(e);
    }
  }
}
