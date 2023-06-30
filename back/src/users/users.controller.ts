import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { StatusEnum } from '../errors/status-enum';
import { MassageEnum } from '../errors/message-enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async addUser(@Body() createDto: CreateUserDto, @Res() res: Response) {
    try {
      await this.userService.create(createDto);
      res.status(StatusEnum.OK).json(MassageEnum.ADD_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }
}
