import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {  }

  @Post('/singUp')
  async signUp(@Body(new ValidationPipe) createUserDto: CreateUserDto): Promise<boolean>{
    return this.authService.singUp(createUserDto)
  }


  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<any> {
    return await this.authService.singIn(signInDto);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  async logout(@Request() req): Promise<boolean> {
    return await this.authService.logout(req.user);
  }

  @Post('/edit')
  @UseGuards(AuthGuard())
  async edit(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.authService.edit(req.user,updateUserDto)
  }

  @Get('/edit')
  @UseGuards(AuthGuard())
  async getUser(@Request() req) {
    return await this.authService.getUser(req.user)
  }

  @Get()
  @UseGuards(AuthGuard())
  get(@Request() req): String {
    console.log(req.user);
    return 'User'
  }

}
