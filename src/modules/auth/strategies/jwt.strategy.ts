import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: (request: Request) => request.cookies?.USER_ACCESS_TOKEN,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { uuid: payload.userObj.uuid },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
