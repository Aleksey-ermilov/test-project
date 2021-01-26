import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { User, UserDocument } from './schemas/user.schemas';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  private readonly saltRounds = 10;

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hash = await this.hashPassword(createUserDto.password);

    const createUser = new this.userModel({ ...createUserDto, password: hash })
    return await createUser.save()

    // console.log('userService',{ ...createUserDto, password: hash });
    // return { ...createUserDto, password: hash }
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec()
  }

  async remove(id:string): Promise<UserDocument> {
    return await this.userModel.findByIdAndRemove(id)
  }

  async update(id:string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
  }

  async findByEmail(email: string){
    return await this.userModel.findOne({ email }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

}
