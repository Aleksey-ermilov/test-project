import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { TokenModule } from '../token/token.module';
import { configModule } from '../configure.root';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TokenModule,
    configModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports:[PassportModule,JwtModule,AuthService]
})
export class AuthModule {}
