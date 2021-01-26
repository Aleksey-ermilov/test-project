import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from '../../user/schemas/user.schemas';


export type TokenDocument = Token & mongoose.Document

@Schema()
export class Token{

  @Prop({ required: true} )
  token: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique:true
  } )
  uid: User

  @Prop({ required: true} )
  expireAt: Date
}

export const TokenSchemas = SchemaFactory.createForClass(Token)
