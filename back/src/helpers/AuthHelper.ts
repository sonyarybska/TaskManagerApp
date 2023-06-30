import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginUserDto } from '../auth/dto/login-user.dto';

@Injectable()
export class AuthHelper {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: LoginUserDto) {
    try {
      const access_token = this.jwtService.sign(user, {
        expiresIn: '3d',
        secret: 'secretWord',
      });
      return {
        access_token,
      };
    } catch (e) {
      console.log(e.message);
    }
  }

  verifyToken(token) {
    try {
      this.jwtService.verify(token, { secret: 'secretWord' });
      return true;
    } catch (e) {
      return false;
    }
  }
}
