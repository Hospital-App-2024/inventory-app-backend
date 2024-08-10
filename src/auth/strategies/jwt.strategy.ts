import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '@prisma/client';

import { envs } from 'src/config/envs';

import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserService: UsersService) {
    super({
      secretOrKey: envs.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.UserService.findOneById(id);

    if (!user) throw new UnauthorizedException('Token is invalid');

    if (!user.isActive) throw new UnauthorizedException('User is not active');

    return user;
  }
}
