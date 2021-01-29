import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { TestSchemas } from './test.shemas';


export type AnswerDocument = Answer & Document

@Schema()
export class Answer{

  @Prop({ required: true, unique:true} )
  textAnswer: string

  @Prop({ required: true} )
  pointCorrect: number

}

export const AnswerSchemas = SchemaFactory.createForClass(Answer).index({ index: 1 }, { unique: true });

