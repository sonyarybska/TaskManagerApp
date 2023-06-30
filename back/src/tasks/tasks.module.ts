import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from '../models/task.model';
import { AuthHelper } from '../helpers/AuthHelper';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  providers: [TasksService, AuthHelper, JwtService],
  controllers: [TasksController],
})
export class TasksModule {}
