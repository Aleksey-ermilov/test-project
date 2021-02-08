import * as mongoose from 'mongoose'
import { IQuestionInterface } from './question.interface';

export interface ITestInterface {
  _id:  mongoose.Types.ObjectId;
  nameTest: string
  countQuestion: number
  idTeacher: string
  timeTest: string
  subject: string
  complexity: string
  dateCreate: string
  idStudent: [string]
  questions: [IQuestionInterface];
}