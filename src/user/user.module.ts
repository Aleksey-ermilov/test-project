import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User, UserSchemas } from './schemas/user.schemas';
import { AuthModule } from '../auth/auth.module';
import { TeacherService } from './teacher.service';
import { TestModule } from '../test/test.module';
import { StudentStoryModule } from '../student-story/student-story.module';

@Module({
  imports:[
    TestModule,
    AuthModule,
    StudentStoryModule,
    MongooseModule.forFeature([ {name: User.name, schema: UserSchemas} ] )
  ],
  controllers: [UserController],
  providers: [UserService,TeacherService],
  exports:[UserService,TeacherService]
})
export class UserModule {}
