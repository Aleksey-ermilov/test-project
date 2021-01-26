import { IsDateString, IsString } from 'class-validator';
import * as mongoose from 'mongoose'

export class CreateUserTokenDto {

  @IsString()
  token: string;

  @IsString()
  uid: mongoose.Types.ObjectId;

  @IsDateString()
  expireAt: string;
}