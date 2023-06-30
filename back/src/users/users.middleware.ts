import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { StatusEnum } from '../errors/status-enum';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const { email, password } = req.body as CreateUserDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException({
        message: 'Such user is exist',
        status: StatusEnum.BAD_REQUEST,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    req.body = { ...req.body, password: hashPassword };

    next();
  }
}
