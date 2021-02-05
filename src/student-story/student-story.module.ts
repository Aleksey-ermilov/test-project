import { Module } from '@nestjs/common';

import { StudentStoryController } from './student-story.controller';
import { StudentStoryService } from './student-story.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    UserModule,
    AuthModule,
  ],
  controllers: [StudentStoryController],
  providers: [StudentStoryService]
})
export class StudentStoryModule {}
