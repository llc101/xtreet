import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDealerDto, EditDealerAdminDto, EditDealerDto } from './dto';

@Injectable()
export class DealerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDealerDto, dealerID: number) {
    try {
      const dealer = this.prisma.dealer.create({
        data: {
          ...dto,
          dealerID,
        },
      });

      if (!dealer) throw new BadRequestException();

      return dealer;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.dealer.findMany();
  }

  async findOne(id: number) {
    try {
      const dealer = this.prisma.dealer.findUnique({
        where: {
          id,
        },
      });

      if (!dealer) throw new BadRequestException();

      return dealer;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: EditDealerAdminDto, id: number) {
    try {
      const dealer = await this.prisma.dealer.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!dealer) throw new BadRequestException();

      return dealer;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateMine(dto: EditDealerDto, id: number, dealerID: number) {
    let dealer;
    try {
      dealer = await this.prisma.dealer.findUnique({
        where: {
          id,
        },
      });

      if (!dealer || dealer.dealerID != dealerID)
        throw new BadRequestException();

      dealer = await this.prisma.dealer.update({
        where: {
          id,
        },
        data: dto,
      });

      return dealer;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMine(id: number, dealerID: number) {
    let dealer;
    try {
      dealer = await this.prisma.dealer.findUnique({
        where: {
          id,
        },
      });

      if (!dealer || dealer.dealerID != dealerID)
        throw new BadRequestException();

      dealer = await this.prisma.dealer.delete({
        where: {
          id,
        },
      });

      return dealer;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const dealer = await this.prisma.dealer.delete({
        where: {
          id,
        },
      });

      if (!dealer) throw new BadRequestException();

      return dealer;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
