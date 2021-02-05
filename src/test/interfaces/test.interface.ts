import * as mongoose from 'mongoose'
import { IQuestionInterface } from './question.interface';

export interface ITestInterface {
  _id:  mongoose.Types.ObjectId;
  nameTest: string
  countQuestion: number
  idTeacher: string
  timeTest: Date
  subject: string
  complexity: string
  dateCreate: Date
  idStudent: [string]
  questions: [IQuestionInterface];
}