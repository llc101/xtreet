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
import { Auth, Public, User } from '../decorators';
import { CreateOneStoreDto, CreateStoreDto, EditStoreAdminDto, EditStoreDto } from './dto';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Auth(Role.USER)
  @Post()
  create(@Body() dto: CreateStoreDto, @User() user: any) {
    return this.storeService.create(dto, user.id);
  }

  @Auth(Role.ADMIN)
  @Post('/create')
  createOne(@Body() dto: CreateOneStoreDto) {
    return this.storeService.createOne(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: EditStoreAdminDto, @Param('id') id: string) {
    return this.storeService.updateOne(dto, +id);
  }

  @Auth(Role.USER)
  @Patch('/mine/:id')
  updateMine(
    @Body() dto: EditStoreDto,
    @Param('id') id: string,
    @User() user: any,
  ) {
    return this.storeService.updateMine(dto, +id, user.id);
  }

  @Auth(Role.USER)
  @Delete('/mine/:id')
  deleteMine(@Param('id') id: string, @User() user: any) {
    return this.storeService.deleteMine(+id, user.id);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.storeService.deleteOne(+id);
  }
}
