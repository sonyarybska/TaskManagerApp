import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from './user.model';
import { Task } from './task.model';

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model<Category> {
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  category_id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: string;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: string;

  @Column({ type: DataType.INTEGER })
  user_id: number;

  @HasMany(() => Task)
  tasks: Task[];

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user: User;
}
