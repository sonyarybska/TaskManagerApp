import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from '../models/category.model';
import { AuthHelper } from '../helpers/AuthHelper';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  providers: [CategoriesService, AuthHelper, JwtService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
