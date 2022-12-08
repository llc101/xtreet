import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedDto } from './dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFeedDto) {
    try {
      const feedback = await this.prisma.feedback.create({
        data: dto,
      });

      if (!feedback) throw new BadRequestException();

      return feedback;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.feedback.findMany();
  }

  async findOne(id: number) {
    try {
      const feedback = await this.prisma.feedback.findUnique({
        where: {
          id,
        },
      });

      if (!feedback) throw new BadRequestException();

      return feedback;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: CreateFeedDto, id: number) {
    try {
      const feedback = this.prisma.feedback.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!feedback) throw new BadRequestException();

      return feedback;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const feedback = this.prisma.feedback.delete({
        where: {
          id,
        },
      });

      if (!feedback) throw new BadRequestException();

      return feedback;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
