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
  timeTest: any
  @IsNotEmpty()
  subject: string
  @IsNotEmpty()
  complexity: string
  @IsNotEmpty()
  dateCreate: any
  @IsNotEmpty()
  questions: [QuestionDto];
}