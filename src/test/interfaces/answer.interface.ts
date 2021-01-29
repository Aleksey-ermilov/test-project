import * as mongoose from 'mongoose'

export interface IAnswerInterface {
  _id:  mongoose.Types.ObjectId;
  textAnswer: string
  pointCorrect: number
}