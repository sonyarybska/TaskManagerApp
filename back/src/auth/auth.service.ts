import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../models/user.model';
import { AuthHelper } from '../helpers/AuthHelper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly authHelper: AuthHelper,
  ) {}

  async login(user) {
    return await this.authHelper.generateToken(user);
  }
}
