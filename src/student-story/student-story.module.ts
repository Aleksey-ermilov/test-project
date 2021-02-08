import { Module } from '@nestjs/common';

import { StudentStoryController } from './student-story.controller';
import { StudentStoryService } from './student-story.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemas } from '../user/schemas/user.schemas';
import { StudentStory, StudentStorySchemas } from './schemas/student-story.schemas';
import { TeacherService } from '../user/teacher.service';
import { TestModule } from '../test/test.module';

@Module({
  imports:[
    MongooseModule.forFeature([ {name: User.name, schema: UserSchemas} ] ),
    MongooseModule.forFeature([ {name: StudentStory.name, schema: StudentStorySchemas} ] ),
    AuthModule,
    TestModule
  ],
  controllers: [StudentStoryController],
  providers: [StudentStoryService, UserService,TeacherService],
  exports:[StudentStoryService]
})
export class StudentStoryModule {}
