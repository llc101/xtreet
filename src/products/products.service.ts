import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, EditProductAdminDto, EditProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    
    try {
      const product = await this.prisma.product.create({
        data: dto,
      });
      
      if (!product) throw new BadRequestException();
      
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!product) throw new BadRequestException();

      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: EditProductAdminDto, id: number) {
    try {
      const product = await this.prisma.product.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!product) throw new BadRequestException();

      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateMine(dto: EditProductDto, id: number, userID: number) {
    let product;
    try {
      const store = await this.prisma.store.findUnique({
        where: {
          ownerID: userID,
        },
      });

      product = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!store || !product || product.storeID !== store.id)
        throw new BadRequestException();

      product = await this.prisma.product.update({
        where: {
          id,
        },
        data: dto,
      });

      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMine(id: number, userID: number) {
    let product;
    try {
      const store = await this.prisma.store.findUnique({
        where: {
          ownerID: userID,
        },
      });

      product = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!store || !product || product.storeID !== store.id)
        throw new BadRequestException();

      product = await this.prisma.product.delete({
        where: {
          id,
        },
      });

      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id,
        },
      });

      if (!product) throw new BadRequestException();

      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
