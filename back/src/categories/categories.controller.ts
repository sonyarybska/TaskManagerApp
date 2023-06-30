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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { StatusEnum } from '../errors/status-enum';
import { MassageEnum } from '../errors/message-enum';
import { EditCategoryDto } from './dto/edit-category.dto';
import { AuthAccessGuard } from '../auth/guards/auth-access.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthAccessGuard)
  @Get(':id')
  async getAllByUser(@Param('id') id: number, @Res() res: Response) {
    const categories = await this.categoriesService.getAllByUser(id);
    res.json(categories);
  }

  @UseGuards(AuthAccessGuard)
  @Post()
  async postCategory(
    @Res() res: Response,
    @Body() createdUser: CreateCategoryDto,
  ) {
    try {
      await this.categoriesService.create(createdUser);
      res.status(StatusEnum.OK).json(MassageEnum.ADD_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }

  @UseGuards(AuthAccessGuard)
  @Delete(':id')
  async deleteCategory(@Res() res: Response, @Param('id') id: number) {
    try {
      await this.categoriesService.delete(id);
      res.status(StatusEnum.NO_CONTENT).json(MassageEnum.DELETE_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }

  @UseGuards(AuthAccessGuard)
  @Put(':id')
  async editCategory(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() categoryDto: EditCategoryDto,
  ) {
    try {
      await this.categoriesService.edit(id, categoryDto);
      res.status(StatusEnum.NO_CONTENT).json(MassageEnum.UPDATE_ITEM);
    } catch (e) {
      res.json(e.message);
    }
  }
}
