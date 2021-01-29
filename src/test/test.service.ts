import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Test, TestDocument } from './schemas/test.shemas';
import { TestDto } from './dto/test.dto';
import { Question, QuestionDocument } from './schemas/question.schemas';
import { Answer, AnswerDocument } from './schemas/answer.schemas';
import { ITestInterface } from './interfaces/test.interface';


@Injectable()
export class TestService {

  constructor(
    @InjectModel(Test.name) private readonly testModel: Model<TestDocument>,
    @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Answer.name) private readonly answerModel: Model<AnswerDocument>,
  ) {}

  async creatTest(testDto:TestDto): Promise<Test> {
    const {questions, ...keys} = testDto
    const createTest = new this.testModel({
      ...keys,
      questions: questions.map( question => {
        return new this.questionModel({
          textQuestion: question.textQuestion,
          pointsForCorrectAnswer: question.pointsForCorrectAnswer,
          answers: question.answers.map(answer => {
              return new this.answerModel(answer)
            })
        })
      })
    })
    return await createTest.save()
  }

}
