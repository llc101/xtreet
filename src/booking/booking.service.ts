import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, EditBookingDto } from './dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    try {
      const booking = await this.prisma.booking.create({
        data: dto,
      });

      if (!booking) throw new BadRequestException();

      return booking;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.booking.findMany();
  }

  async findOne(id: number) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id,
        },
      });

      if (!booking) throw new BadRequestException();

      return booking;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateOne(dto: EditBookingDto, id: number) {
    try {
      const booking = this.prisma.booking.update({
        where: {
          id,
        },
        data: dto,
      });

      if (!booking) throw new BadRequestException();

      return booking;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(id: number) {
    try {
      const booking = this.prisma.booking.delete({
        where: {
          id,
        },
      });

      if (!booking) throw new BadRequestException();

      return booking;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
