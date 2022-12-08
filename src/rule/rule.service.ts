import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRuleDto } from './dto';

@Injectable()
export class RuleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRuleDto) {
    try {
      const rule = await this.prisma.rule.create({
        data: dto,
      });

      if (!rule) throw new BadRequestException();

      return rule;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.rule.findMany();
  }

  async findOne(id: number) {
    try {
      const rule = await this.prisma.rule.findUnique({
        where: {
          id,
        },
      });

      if (!rule) throw new BadRequestException();

      return rule;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: CreateRuleDto, id: number) {
    try {
      const rule = this.prisma.rule.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!rule) throw new BadRequestException();

      return rule;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const rule = this.prisma.rule.delete({
        where: {
          id,
        },
      });

      if (!rule) throw new BadRequestException();

      return rule;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
