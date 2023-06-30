import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

import { User } from '../models/user.model';
import { StatusEnum } from '../errors/status-enum';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const { email, password } = req.body as LoginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException({
        message: 'Wrong password or email',
        status: StatusEnum.BAD_REQUEST,
      });
    }

    const validate = await bcrypt.compare(password, user.password);

    if (!validate) {
      throw new BadRequestException({
        message: 'Wrong password or email',
        status: StatusEnum.BAD_REQUEST,
      });
    }

    req.body = user.dataValues;

    next();
  }
}
