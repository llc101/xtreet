import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto, EditAdminDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAdminDto) {
    try {
      dto.hash = await argon.hash(dto.hash);

      const admin = await this.prisma.admin.create({
        data: dto,
      });

      if (!admin) throw new BadRequestException();

      delete admin.hash;

      return admin;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: {
          id,
        },
      });

      if (!admin) throw new BadRequestException();

      delete admin.hash;
      return admin;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: EditAdminDto, id: number) {
    try {
      const admin = await this.prisma.admin.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!admin) throw new BadRequestException();

      delete admin.hash;
      return admin;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const admin = await this.prisma.admin.delete({
        where: {
          id,
        },
      });

      if (!admin) throw new BadRequestException();

      delete admin.hash;
      return admin;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
