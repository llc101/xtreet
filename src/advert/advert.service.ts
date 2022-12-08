import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdvertDto } from './dto';

@Injectable()
export class AdvertService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAdvertDto) {
    console.log(dto);
    
    try {
      const advert = await this.prisma.advert.create({
        data: dto,
      });

      if (!advert) throw new BadRequestException();

      return advert;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.advert.findMany();
  }

  async findOne(id: number) {
    try {
      const advert = await this.prisma.advert.findUnique({
        where: {
          id,
        },
      });

      if (!advert) throw new BadRequestException();

      return advert;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: CreateAdvertDto, id: number) {
    try {
      const advert = this.prisma.advert.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!advert) throw new BadRequestException();

      return advert;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const advert = this.prisma.advert.delete({
        where: {
          id,
        },
      });

      if (!advert) throw new BadRequestException();

      return advert;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
