import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRateDto } from './dto';

@Injectable()
export class RateService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRateDto) {
    try {
      const rate = await this.prisma.rate.create({
        data: dto,
      });

      if (!rate) throw new BadRequestException();

      return rate;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.rate.findMany();
  }

  async findOne(id: number) {
    try {
      const rate = await this.prisma.rate.findUnique({
        where: {
          id,
        },
      });

      if (!rate) throw new BadRequestException();

      return rate;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: CreateRateDto, id: number) {
    try {
      const rate = this.prisma.rate.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!rate) throw new BadRequestException();

      return rate;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const rate = this.prisma.rate.delete({
        where: {
          id,
        },
      });

      if (!rate) throw new BadRequestException();

      return rate;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
