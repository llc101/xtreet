import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Role } from 'src/auth/dto';
import { Auth, Public } from 'src/decorators';
import { BookingService } from './booking.service';
import { CreateBookingDto, EditBookingDto } from './dto';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: EditBookingDto, @Param('id') id: string) {
    return this.bookingService.updateOne(dto, +id);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.bookingService.deleteOne(+id);
  }
}
