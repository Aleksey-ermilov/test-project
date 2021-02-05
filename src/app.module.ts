import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { configModule } from './configure.root';
import { TokenModule } from './token/token.module';
import { TestModule } from './test/test.module';
import { StudentStoryModule } from './student-story/student-story.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TokenModule,
    configModule,
    // MongooseModule.forRoot('mongodb+srv://alex:aleksey01@cluster0.ioqyo.mongodb.net/test-project?retryWrites=true&w=majority')
    MongooseModule.forRoot(
      process.env.URI_DB_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
    TestModule,
    StudentStoryModule,
  ]
})
export class AppModule {}
