import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { roleEnum } from '../enums/role.enum';

export type UserDocument = User & Document

@Schema()
export class User{

  @Prop({ required: true, unique:true} )
  email: string

  @Prop({ required: true} )
  name: string

  @Prop({ required: true} )
  group: string

  @Prop({ required: true} )
  course: string

  @Prop({ required: true} )
  specialty: string

  @Prop({ required: true} )
  password: string

  @Prop({ required: true, enum: Object.values(roleEnum)})
  role: string

  @Prop({ required: true, default: '3' })
  avatar: string
}

export const UserSchemas = SchemaFactory.createForClass(User)


//   name: 'Viki',
//   email: 'Viki@mail.ru',
//   group: '3541',
//   course: '1',
//   specialty:'UTS',
//   pass:'111',
//   role: 'student',
//   avatar: '3',
//   id: '2',

//   name:'John',
//   email: 'John@mail.ru',
//   subject:'History',
//   pass:'111',
//   role: 'teacher',
//   avatar: '3',
//   id: '3',