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
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto';

@Controller('adverts')
export class AdvertController {
  constructor(private advertService: AdvertService) {}

  @Post()
  create(@Body() dto: CreateAdvertDto) {
    return this.advertService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.advertService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: CreateAdvertDto, @Param('id') id: string) {
    return this.advertService.updateOne(dto, +id);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.advertService.deleteOne(+id);
  }
}
