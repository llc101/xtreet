import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDealDto, EditDealAdminDto, EditDealDto } from './dto';

@Injectable()
export class DealService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDealDto) {
    try {
      const deal = await this.prisma.deal.create({
        data: dto,
      });

      if (!deal) throw new BadRequestException();

      return deal;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.deal.findMany();
  }

  async findOne(id: number) {
    try {
      const deal = await this.prisma.deal.findUnique({
        where: {
          id,
        },
      });

      if (!deal) throw new BadRequestException();

      return deal;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: EditDealAdminDto, id: number) {
    try {
      const deal = await this.prisma.deal.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!deal) throw new BadRequestException();

      return deal;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateMine(dto: EditDealDto, id: number, dealerID: number) {
    let deal;
    try {
      const dealer = await this.prisma.dealer.findUnique({
        where: {
          dealerID,
        },
      });

      deal = await this.prisma.deal.findUnique({
        where: {
          id,
        },
      });

      if (!dealer || !deal || deal.dealerID != dealer.id)
        throw new BadRequestException();

      deal = await this.prisma.deal.update({
        where: {
          id,
        },
        data: dto,
      });

      return deal;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMine(id: number, dealerID: number) {
    let deal;
    try {
      const dealer = await this.prisma.dealer.findUnique({
        where: {
          dealerID,
        },
      });

      deal = await this.prisma.deal.findUnique({
        where: {
          id,
        },
      });

      if (!dealer || !deal || deal.dealerID != dealer.id)
        throw new BadRequestException();

      deal = this.prisma.deal.delete({
        where: {
          id,
        },
      });

      return deal;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const deal = await this.prisma.deal.delete({
        where: {
          id,
        },
      });

      if (!deal) throw new BadRequestException();

      return deal;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
