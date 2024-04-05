import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ignoreElements } from 'rxjs';
import { JwtPayload } from '../interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('ACCESS_SECRET_KEY'),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
