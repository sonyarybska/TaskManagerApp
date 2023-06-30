import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Category } from './category.model';

@Table({ tableName: 'tasks', timestamps: false })
export class Task extends Model<Task> {
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  task_id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.DATE,
  })
  dateStart: string;

  @Column({
    type: DataType.DATE,
  })
  dateEnd: string;

  @ForeignKey(() => Category)
  @Column({ field: 'category_id' })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;
}
