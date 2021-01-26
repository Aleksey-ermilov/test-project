import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenService } from './token.service';

import { Token, TokenSchemas } from './schemas/token.schemas';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchemas}])
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
