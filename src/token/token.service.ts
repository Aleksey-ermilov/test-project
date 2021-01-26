import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { Token, TokenDocument } from './schemas/token.schemas';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private readonly tokenModel: Model<TokenDocument>) {}

  async create (createUserTokenDto: CreateUserTokenDto): Promise<Token> {
    const userToken = new this.tokenModel(createUserTokenDto)
    return await userToken.save()
  }

  async remove(uid: string, token: string): Promise<{ ok?: number, n?: number }> {
    return await this.tokenModel.deleteOne({ uid, token })
  }

  async removeAll(uid: string): Promise<{ ok?: number, n?: number }> {
    return await this.tokenModel.deleteMany({ uid })
  }

  async exists(uid, token: string): Promise<boolean> {
    return await this.tokenModel.exists({uid, token})
  }
}
