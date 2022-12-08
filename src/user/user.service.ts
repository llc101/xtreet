import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, EditUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      dto.hash = await argon.hash(dto.hash);

      const user = await this.prisma.user.create({
        data: dto,
      });

      if (!user) throw new BadRequestException();

      delete user.hash;

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) throw new BadRequestException();

      delete user.hash;
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: EditUserDto, id: number) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!user) throw new BadRequestException();

      delete user.hash;
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      if (!user) throw new BadRequestException();

      delete user.hash;
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
