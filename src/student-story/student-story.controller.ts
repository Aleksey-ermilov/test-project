import { Controller, Get, Request, UseGuards, Param, Post, HttpCode, Body, HttpStatus } from '@nestjs/common';

import { StudentStoryService } from './student-story.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateStudentStoryDto } from './dto/create-student-story.dto';

@Controller('student-story')
export class StudentStoryController {

  constructor(private readonly studentStoryService: StudentStoryService){}

  @Get()
  @UseGuards(AuthGuard())
  get(): Promise<string> | String {
    return 'Student-story'
  }

  @Get('/findByIdUser')
  @UseGuards(AuthGuard())
  findByIdUser(@Request() req) {
    return this.studentStoryService.findByIdUser(req.user)
  }

  @Get('/findByIdTest/:id')
  @UseGuards(AuthGuard())
  findByIdTest(@Param('id') id: string) {
    return this.studentStoryService.findByIdTest(id)
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStudentStoryDto: CreateStudentStoryDto ) {
    return this.studentStoryService.create(createStudentStoryDto)
  }

  @Post('/remove/:testStoryId')
  @UseGuards(AuthGuard())
  remove(@Request() req, @Param('testStoryId') testStoryId: string) {
    return this.studentStoryService.remove(req.user,testStoryId)
  }
}
