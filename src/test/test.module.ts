import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchemas } from './schemas/test.shemas';
import { Question, QuestionSchemas } from './schemas/question.schemas';
import { Answer, AnswerSchemas } from './schemas/answer.schemas';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([
      {name: Test.name, schema: TestSchemas},
      {name: Question.name, schema: QuestionSchemas},
      {name: Answer.name, schema: AnswerSchemas}
      ] )
  ],
  providers: [TestService],
  controllers: [TestController],
  exports:[TestService]
})
export class TestModule {}
