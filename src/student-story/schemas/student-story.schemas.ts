import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type StudentStoryDocument = StudentStory & Document

@Schema()
export class StudentStory{

  @Prop({ required: true } )
  uid: string

  @Prop({ required: true } )
  tid: string

  @Prop({ required: true } )
  listAnswer: [object]

  @Prop({ required: true } )
  time: string

  @Prop({ required: true } )
  percent: string

  @Prop({ required: true } )
  appraisal: string
}

export const StudentStorySchemas = SchemaFactory.createForClass(StudentStory)

