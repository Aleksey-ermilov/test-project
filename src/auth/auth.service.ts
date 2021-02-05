import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {SignOptions} from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'
import * as moment from 'moment';

import { TokenService } from '../token/token.service';

import { ITokenPayload } from './interfaces/token-payload.interface';
import { IUser } from '../user/interfaces/user.interface';
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async singIn(user, password): Promise<any> {
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.signUser(user);
      user.password = undefined

      return {user, token}
    }
    throw new BadRequestException('Invalid credentials');
  }

  async logout(_id, token): Promise<boolean>{
    await this.tokenService.remove(_id, token)
    return true
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
