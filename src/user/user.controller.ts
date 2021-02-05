import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

import { User } from './schemas/user.schemas';

import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from '../auth/dto/signin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { TeacherService } from './teacher.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly teacherService: TeacherService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  get(): String {
    return 'User'
  }

  /*@Get(':id')
  @UseGuards(AuthGuard())
  getUser(@Param('id') id: string ): Promise<IUser> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.userService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string): Promise<IUser> {
    return this.userService.remove(id)
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<IUser> {
    return this.userService.update(id,updateUserDto)
  }*/

  @Post('/singUp')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body(new ValidationPipe) createUserDto: CreateUserDto): Promise<boolean>{
    return this.userService.signUp(createUserDto)
  }

  @Post('/singIn')
  async signIn(@Body(new ValidationPipe) signInDto: SignInDto): Promise<any>{
    return this.userService.singIn(signInDto)
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  async logout(@Request() req): Promise<boolean> {
    return this.userService.logout(req.user)
  }

  @Post('/update')
  @UseGuards(AuthGuard())
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<IUser> {
    return this.userService.update(req.user,updateUserDto)
  }

  @Get('/update')
  @UseGuards(AuthGuard())
  async getUser(@Request() req): Promise<IUser> {
    return this.userService.getUser(req.user)
  }


  @Post('/addStudentInTest')
  @UseGuards(AuthGuard())
  async addStudentInTest(@Request() req,@Body() data){
    return this.teacherService.addStudentInTest(req.user,data)
  }

  @Post('/removeStudentInTest')
  @UseGuards(AuthGuard())
  async removeStudentInTest(@Request() req,@Body() data){
    return this.teacherService.removeStudentInTest(req.user,data)
  }
}
