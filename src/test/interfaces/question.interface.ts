import * as mongoose from 'mongoose'
import { IAnswerInterface } from './answer.interface';

export interface IQuestionInterface {
  _id:  mongoose.Types.ObjectId;
  textQuestion: string
  pointsForCorrectAnswer: number
  answers: [IAnswerInterface];
}