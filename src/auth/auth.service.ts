import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {SignOptions} from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'
import * as moment from 'moment';

import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { IUser } from '../user/interfaces/user.interface';
import { SignInDto } from './dto/signin.dto';
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async singUp(createUserDto: CreateUserDto): Promise<boolean>  {
    await this.userService.create(createUserDto)
    return true
  }

  async singIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.userService.findByEmail(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.signUser(user);
      user.password = undefined

      return {user, token}
    }
    throw new BadRequestException('Invalid credentials');
  }

  async logout({_id, token}): Promise<boolean>{
    await this.tokenService.remove(_id, token)
    return true
  }

  async edit({_id}, updateUserDto:UpdateUserDto){
    const user =  await this.userService.update(_id,updateUserDto)
    user.password = undefined
    return user
  }

  async getUser({_id}){
    const user = await this.userService.findById(_id)
    user.password = undefined
    return user
  }


  async signUser(user: IUser): Promise<string> {

    const tokenPayload: ITokenPayload = {
      _id: user._id,
      roles: user.role,
    };

    const token = await this.generateToken(tokenPayload);
    const expireAt = moment()
      .add(60, 'seconds')
      .toISOString();

    await this.saveToken({
      token,
      expireAt,
      uid: user._id,
    });

    return token;
  }

  private async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private saveToken(createUserTokenDto: CreateUserTokenDto) {
    return this.tokenService.create(createUserTokenDto);
  }



  private async verifyToken(token): Promise<any> { // проверка на наличие токена
    const data = this.jwtService.verify(token) as ITokenPayload
    const tokenExists = await this.tokenService.exists(data._id, token);

    if (tokenExists) {
      return data;
    }
    return false
  }

}
