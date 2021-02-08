import { IsNotEmpty } from 'class-validator';

export class CreateStudentStoryDto {
  @IsNotEmpty()
  uid: string
  @IsNotEmpty()
  tid: string
  @IsNotEmpty()
  listAnswer: [object]
  @IsNotEmpty()
  time: string
  @IsNotEmpty()
  percent: string
  @IsNotEmpty()
  appraisal: string
}