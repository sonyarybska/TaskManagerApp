import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Category } from '../models/category.model';
import { Task } from '../models/task.model';
import { EditCategoryDto } from './dto/edit-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
  ) {}

  async getAllByUser(id) {
    return await this.categoryRepository.findAll({
      where: { user_id: id },
      include: { model: Task, as: 'tasks' },
    });
  }

  async create(body) {
    return await this.categoryRepository.create({ ...body });
  }

  async delete(id: number) {
    return await this.categoryRepository.destroy({
      where: { category_id: id },
    });
  }

  async edit(id: number, category: EditCategoryDto) {
    return await this.categoryRepository.update(
      { ...category },
      { where: { category_id: id } },
    );
  }
}
