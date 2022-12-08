import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOneStoreDto, CreateStoreDto, EditStoreAdminDto, EditStoreDto } from './dto';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStoreDto, ownerID: number) {
    try {
      const store = this.prisma.store.create({
        data: {
          ...dto,
          ownerID,
        },
      });

      if (!store) throw new BadRequestException();

      return store;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  
  async createOne(dto: CreateOneStoreDto) {
    try {
      const store = this.prisma.store.create({
        data: {
          ...dto,
        },
      });

      if (!store) throw new BadRequestException();

      return store;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.store.findMany({
      include: {
        products: true
      }
    });
  }

  async findOne(id: number) {
    try {
      const store = this.prisma.store.findUnique({
        where: {
          id,
        },
      });

      if (!store) throw new BadRequestException();

      return store;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: EditStoreAdminDto, id: number) {
    try {
      const store = await this.prisma.store.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!store) throw new BadRequestException();

      return store;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateMine(dto: EditStoreDto, id: number, ownerID: number) {
    let store;
    try {
      store = await this.prisma.store.findUnique({
        where: {
          id,
        },
      });

      if (!store || store.ownerID != ownerID) throw new BadRequestException();

      store = await this.prisma.store.update({
        where: {
          id,
        },
        data: dto,
      });

      return store;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMine(id: number, ownerID: number) {
    let store;
    try {
      store = await this.prisma.store.findUnique({
        where: {
          id,
        },
      });

      if (!store || store.ownerID != ownerID) throw new BadRequestException();

      store = await this.prisma.store.delete({
        where: {
          id,
        },
      });

      return store;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const store = await this.prisma.store.delete({
        where: {
          id,
        },
      });

      if (!store) throw new BadRequestException();

      return store;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
