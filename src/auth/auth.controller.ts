import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from '../user/interfaces/readable-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {  }

  @Post('/singUp')
  async signUp(@Body(new ValidationPipe) createUserDto: CreateUserDto): Promise<boolean>{
    return this.authService.singUp(createUserDto)
  }


  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    return await this.authService.singIn(signInDto);
  }

}
