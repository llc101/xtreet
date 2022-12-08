import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth, Public, User } from '../decorators';
import { CreateDealerDto, EditDealerAdminDto, EditDealerDto } from './dto';
import { DealerService } from './dealer.service';
import { Role } from 'src/auth/dto';

@Controller('dealers')
export class DealerController {
  constructor(private dealerService: DealerService) {}

  @Post()
  create(@Body() dto: CreateDealerDto, @User() user: any) {
    return this.dealerService.create(dto, user.id);
  }

  @Public()
  @Get()
  findAll() {
    return this.dealerService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealerService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: EditDealerAdminDto, @Param('id') id: string) {
    return this.dealerService.updateOne(dto, +id);
  }

  @Auth(Role.USER)
  @Patch('/mine/:id')
  updateMine(
    @Body() dto: EditDealerDto,
    @Param('id') id: string,
    @User() user: any,
  ) {
    return this.dealerService.updateMine(dto, +id, user.id);
  }

  @Auth(Role.USER)
  @Delete('/mine/:id')
  deleteMine(@Param('id') id: string, @User() user: any) {
    return this.dealerService.deleteMine(+id, user.id);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.dealerService.deleteOne(+id);
  }
}
