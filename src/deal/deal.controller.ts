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
import { Auth, Public, User } from 'src/decorators';
import { DealService } from './deal.service';
import { CreateDealDto, EditDealAdminDto, EditDealDto } from './dto';

@Controller('deals')
export class DealController {
  constructor(private dealService: DealService) {}

  @Post()
  create(@Body() dto: CreateDealDto) {
    return this.dealService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.dealService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: EditDealAdminDto, @Param('id') id: string) {
    return this.dealService.updateOne(dto, +id);
  }

  @Auth(Role.USER)
  @Patch('/mine/:id')
  updateMine(
    @Body() dto: EditDealDto,
    @Param('id') id: string,
    @User() user: any,
  ) {
    return this.dealService.updateMine(dto, +id, user.id);
  }

  @Auth(Role.USER)
  @Delete('/mine/:id')
  deleteMine(@Param('id') id: string, @User() user: any) {
    return this.dealService.deleteMine(+id, user.id);
  }
  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.dealService.deleteOne(+id);
  }
}
