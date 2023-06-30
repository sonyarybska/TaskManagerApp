import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class EditTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dateStart: string;

  @IsNotEmpty()
  @IsDateString()
  dateEnd: string;
}
