import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from '../models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskRepository: typeof Task,
  ) {}

  getAllByCategory(id: number) {
    return this.taskRepository.findAll({ where: { category_id: id } });
  }

  getOne(id: number) {
    return this.taskRepository.findOne({ where: { task_id: id } });
  }

  create(body: CreateTaskDto) {
    return this.taskRepository.create({ ...body });
  }

  edit(body: EditTaskDto, id: number) {
    return this.taskRepository.update({ ...body }, { where: { task_id: id } });
  }

  delete(id: number) {
    return this.taskRepository.destroy({ where: { task_id: id } });
  }
}
