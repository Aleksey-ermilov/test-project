import { IsNotEmpty } from 'class-validator';

export class AnswerDto {

  @IsNotEmpty()
  textAnswer: string
  @IsNotEmpty()
  pointCorrect: number
}