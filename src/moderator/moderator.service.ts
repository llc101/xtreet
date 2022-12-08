import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModDto, EditModDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class ModeratorService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateModDto) {
    try {
      dto.hash = await argon.hash(dto.hash);

      const moderator = await this.prisma.moderator.create({
        data: dto,
      });

      if (!moderator) throw new BadRequestException();

      return moderator;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.moderator.findMany();
  }

  async findOne(id: number) {
    try {
      const moderator = await this.prisma.moderator.findUnique({
        where: {
          id,
        },
      });

      if (!moderator) throw new BadRequestException();

      return moderator;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: EditModDto, id: number) {
    try {
      const moderator = await this.prisma.moderator.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!moderator) throw new BadRequestException();

      return moderator;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const moderator = await this.prisma.moderator.delete({
        where: {
          id,
        },
      });

      if (!moderator) throw new BadRequestException();

      return moderator;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
