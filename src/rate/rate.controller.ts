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
import { CreateRateDto } from './dto';
import { RateService } from './rate.service';

@Controller('rates')
export class RateController {
  constructor(private rateService: RateService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateRateDto) {
    return this.rateService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.rateService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: CreateRateDto, @Param('id') id: string) {
    return this.rateService.updateOne(dto, +id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.rateService.deleteOne(+id);
  }
}
