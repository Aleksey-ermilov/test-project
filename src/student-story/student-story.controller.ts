import { Controller, Get, UseGuards } from '@nestjs/common';

import { StudentStoryService } from './student-story.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('student-story')
export class StudentStoryController {

  constructor(private readonly studentStoryService: StudentStoryService){}

  @Get()
  @UseGuards(AuthGuard())
  get(): String {
    return 'Student-story'
  }
}
