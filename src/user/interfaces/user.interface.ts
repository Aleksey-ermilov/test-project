import * as mongoose from 'mongoose'

export interface IUser {
  readonly _id?: mongoose.Types.ObjectId;
  readonly email: string;
  readonly name: string;
  readonly group: string;
  readonly course: string;
  readonly specialty: string;
  password?: string;
  readonly role: string;
  readonly avatar: string;
  token?: string;
}