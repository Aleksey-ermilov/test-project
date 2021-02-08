import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Question } from './question.schemas';


export type TestDocument = Test & Document

@Schema()
export class Test{

  @Prop({ required: true} )
  nameTest: string

  @Prop({ required: true} )
  countQuestion: number

  @Prop({ required: true} )
  idTeacher: string

  @Prop({ required: true} ) // string or Date ?
  timeTest: string

  @Prop({ required: true} )
  subject: string

  @Prop({ required: true} )
  complexity: string

  @Prop({ required: true } )
  dateCreate: string

  @Prop({default: []})
  idStudent: [String]

  @Prop()
  questions: [Question];

}

export const TestSchemas = SchemaFactory.createForClass(Test)//.index({ dateCreate: 1 }, { unique: true });