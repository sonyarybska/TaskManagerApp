import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  dateStart: string;

  @IsNotEmpty()
  @IsString()
  dateEnd: string;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;
}
