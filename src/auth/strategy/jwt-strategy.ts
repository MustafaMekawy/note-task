import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import { Prisma } from '@prisma/client'
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    try {
      const currentUser = await this.userService.findOneBy({
        id: payload.userId,
        email: payload.email,
      });

      if (!currentUser) {
        throw new UnauthorizedException(
          'You are not logged in, please login and try again!',
        );
      }
      delete currentUser.password;
      return currentUser;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Internal Error!');
      }
      throw err;
    }
  }
}
