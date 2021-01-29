import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TestService } from './test.service';

import { TestDto } from './dto/test.dto';

import { Test } from './schemas/test.shemas';

@Controller('test')
export class TestController {

  constructor(private readonly testService: TestService) {
  }

  @Get()
  @UseGuards(AuthGuard())
  get(): String {
    return 'Test'
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  create(@Body() testDto: TestDto): Promise<Test> {
    // console.log(testDto);
    return this.testService.creatTest(testDto)
  }

}


/*
{
    "nameTest": "История",
  "countQuestion": 3,
  "idTeacher": "120",
  "timeTest": 600,
  "subject":"История",
  "complexity":"Easy",
  "dateCreate": "1611953286272",
  "questions":
[
  {
    "textQuestion": "Вопрос 1", "pointsForCorrectAnswer": 1,
    "answers":
      [
        {"textAnswer": "Ответ 1", "pointCorrect": 1},
        {"textAnswer": "Ответ 2", "pointCorrect": 0},
        {"textAnswer": "Ответ 3", "pointCorrect": 0}
      ]
  },

  {
    "textQuestion": "Вопрос 2", "pointsForCorrectAnswer": 1,
    "answers":
      [
        {"textAnswer": "Ответ 1", "pointCorrect": 0},
        {"textAnswer": "Ответ 2", "pointCorrect": 1}
      ]
  },

  {
    "textQuestion": "Вопрос 3", "pointsForCorrectAnswer": 2,
    "answers":
      [
        {"textAnswer": "Ответ 1", "pointCorrect": 0},
        {"textAnswer": "Ответ 2", "pointCorrect": 0},
        {"textAnswer": "Ответ 3", "pointCorrect": 2},
        {"textAnswer": "Ответ 4", "pointCorrect": 0}
      ]
  }
]
}
 */
