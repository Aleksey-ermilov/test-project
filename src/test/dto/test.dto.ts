import { IsNotEmpty } from 'class-validator';
import { QuestionDto } from './question.dto';

export class TestDto {
  @IsNotEmpty()
  nameTest: string
  @IsNotEmpty()
  countQuestion: number
  @IsNotEmpty()
  idTeacher: string
  @IsNotEmpty()
  timeTest: string
  @IsNotEmpty()
  subject: string
  @IsNotEmpty()
  complexity: string
  @IsNotEmpty()
  dateCreate: string
  @IsNotEmpty()
  idStudent: [string]
  @IsNotEmpty()
  questions: [QuestionDto];
}