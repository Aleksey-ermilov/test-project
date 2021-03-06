import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { TokenService } from '../token/token.service';
import { User, UserDocument } from '../user/schemas/user.schemas';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
      ignoreExpiration:true
    });
  }

  async validate(req, user: Partial<any>) { // 123  UserDocument  ?
    const token = req.headers.authorization.slice(7)
    const tokenExists = await this.tokenService.exists(user._id, token)
    if (tokenExists) {
      return  { ...user, token} ;
    } else {
      throw new UnauthorizedException();
    }
  }
}