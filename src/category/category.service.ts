import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: dto,
      });

      if (!category) throw new BadRequestException();

      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id,
        },
      });

      if (!category) throw new BadRequestException();

      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: CreateCategoryDto, id: number) {
    try {
      const category = await this.prisma.category.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!category) throw new BadRequestException();

      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const category = await this.prisma.category.delete({
        where: {
          id,
        },
      });

      if (!category) throw new BadRequestException();

      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
