import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { TasksModule } from '../tasks/tasks.module';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Task, Category],
      autoLoadModels: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
