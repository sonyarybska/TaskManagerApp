import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { TasksService } from './tasks.service';
import { StatusEnum } from '../errors/status-enum';
import { MassageEnum } from '../errors/message-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { AuthAccessGuard } from '../auth/guards/auth-access.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(AuthAccessGuard)
  @Get('category/:id')
  async getTaskByCategory(@Param('id') id: number, @Res() res: Response) {
    try {
      const tasks = await this.taskService.getAllByCategory(id);
      res.status(StatusEnum.OK).json(tasks);
    } catch (e) {
      res.json(e.message);
    }
  }

  @UseGuards(AuthAccessGuard)
  @Get(':id')
  async getOneTask(@Param('id') id: number, @Res() res: Response) {
    try {
      const task = await this.taskService.getOne(id);
      res.status(StatusEnum.OK).json(task);
    } catch (e) {
      res.json(e.message);
    }
  }

  @UseGuards(AuthAccessGuard)
  @Post()
  async addTask(@Body() createDto: CreateTaskDto, @Res() res: Response) {
    try {
      await this.taskService.create(createDto);
      res.status(StatusEnum.OK).json(MassageEnum.ADD_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }

  @UseGuards(AuthAccessGuard)
  @Put(':id')
  async editTask(
    @Body() editDto: EditTaskDto,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      await this.taskService.edit(editDto, id);
      res.status(StatusEnum.NO_CONTENT).json(MassageEnum.UPDATE_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }

  @UseGuards(AuthAccessGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.taskService.delete(id);
      res.status(StatusEnum.NO_CONTENT).json(MassageEnum.DELETE_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }
}
