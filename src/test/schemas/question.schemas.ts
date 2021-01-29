import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Answer } from './answer.schemas';
import { TestSchemas } from './test.shemas';


export type QuestionDocument = Question & Document

@Schema()
export class Question{

  @Prop({ required: true, unique:true} )
  textQuestion: string

  @Prop({ required: true} )
  pointsForCorrectAnswer: number

  @Prop()
  answers: [Answer];

}

export const QuestionSchemas = SchemaFactory.createForClass(Question).index({ index: 1 }, { unique: true });
