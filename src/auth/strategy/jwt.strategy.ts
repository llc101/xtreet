import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    let user;
    switch (payload.role) {
      case Role.USER:
        user = await this.prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            mobile: true,
            email: true,
          },
        });

        if (!user) throw new ForbiddenException('Invalid Token');
        break;
      case Role.MODERATOR:
        user = await this.prisma.moderator.findUnique({
          where: {
            id: payload.sub,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            mobile: true,
            email: true,
          },
        });

        if (!user) throw new ForbiddenException('Invalid Token');
        break;
      case Role.ADMIN:
        user = await this.prisma.admin.findUnique({
          where: {
            id: payload.sub,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            mobile: true,
            email: true,
          },
        });

        if (!user) throw new ForbiddenException('Invalid Token');
        break;

      default:
        throw new ForbiddenException('Invalid Token');
        break;
    }

    return {
      role: payload.role,
      ...user,
    };
  }
}
