import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User, UserSchemas } from './schemas/user.schemas';

@Module({
  imports:[
    MongooseModule.forFeature([ {name: User.name, schema: UserSchemas} ] )
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
