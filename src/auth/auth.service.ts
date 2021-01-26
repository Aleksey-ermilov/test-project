import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {SignOptions} from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'
import * as moment from 'moment';

import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import { UserDocument } from '../user/schemas/user.schemas';
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto';
import { ITokenPayload } from './interfaces/token-payload.interface';

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

  async singIn({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.userService.findByEmail(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.signUser(user);
      const readUser = user.toObject() as IReadableUser
      return { ...readUser, token }
    }
    throw new BadRequestException('Invalid credentials');
  }

  async signUser(user: UserDocument): Promise<string> {

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
