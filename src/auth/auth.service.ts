import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto, Role } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    let user, token;
    switch (dto.scope.toLowerCase()) {
      case 'user':
        user = await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });

        if (!user || !(await argon.verify(user.hash, dto.password)))
          throw new ForbiddenException();

        token = await this.signToken(user, Role.USER);
        break;
      case 'moderator':
        user = await this.prisma.moderator.findUnique({
          where: {
            email: dto.email,
          },
        });

        if (!user || !(await argon.verify(user.hash, dto.password)))
          throw new ForbiddenException();

        token = await this.signToken(user, Role.MODERATOR);
        break;
      case 'admin':
        user = await this.prisma.admin.findUnique({
          where: {
            email: dto.email,
          },
        });

        if (!user || !(await argon.verify(user.hash, dto.password)))
          throw new ForbiddenException();

        token = await this.signToken(user, Role.ADMIN);
        break;

      default:
        throw new ForbiddenException();
    }

    delete user.hash;

    return {
      access_token: token,
      user,
    };
  }

  signToken(user: any, role: Role): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role,
    };

    return this.jwt.signAsync(payload, {
      issuer: 'parrot',
      secret: this.config.get('SECRET_KEY'),
      expiresIn: '30d',
    });
  }
}
