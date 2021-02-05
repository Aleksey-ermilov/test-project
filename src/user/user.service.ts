import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { User, UserDocument } from './schemas/user.schemas';

import { AuthService } from '../auth/auth.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from '../auth/dto/signin.dto';

import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {

  private readonly saltRounds = 10;

  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);

    const createUser = new this.userModel({ ...createUserDto, password: hash })
    return await createUser.save()

    // console.log('userService',{ ...createUserDto, password: hash });
    // return { ...createUserDto, password: hash }
  }

  async findById(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec()
  }

  async remove(id:string): Promise<IUser> {
    return await this.userModel.findByIdAndRemove(id)
  }

  async update({_id}, updateUserDto: UpdateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(updateUserDto.password);
    const user = await this.userModel.findByIdAndUpdate(
      _id,
      {...updateUserDto, password: hash}, { new: true }
    )
    user.password = undefined
    return user
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async singIn({ email, password }: SignInDto) {
    const user = await this.findByEmail(email)

    return await this.authService.singIn(user, password)
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    await this.create(createUserDto)
    return true
  }

  async logout({_id, token}): Promise<boolean> {
    return this.authService.logout(_id, token)
  }

  async getUser({_id}): Promise<IUser> {
    const user = await this.findById(_id)
    user.password = undefined
    return user
  }

}
