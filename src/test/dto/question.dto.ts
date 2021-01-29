import { IsNotEmpty } from 'class-validator';

import { AnswerDto } from './answer.dto';

export class QuestionDto {

  @IsNotEmpty()
  textQuestion: string
  @IsNotEmpty()
  pointsForCorrectAnswer: number
  @IsNotEmpty()
  answers: [AnswerDto];

}