import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { UserService } from './user.service';

import { User } from './schemas/user.schemas';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get()
  get(): String {
    return 'User'
  }

  @Get(':id')
  getUser(@Param('id') id: string ): Promise<IUser> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.userService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IUser> {
    return this.userService.remove(id)
  }

  @Put(':id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<IUser> {
    return this.userService.update(id,updateUserDto)
  }
}
