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
import { Auth, Public } from '../decorators';
import { AdminService } from './admin.service';
import { CreateAdminDto, EditAdminDto } from './dto';

@Auth(Role.ADMIN)
@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Public()
  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  updateOne(@Body() dto: EditAdminDto, @Param('id') id: string) {
    return this.adminService.updateOne(dto, +id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.adminService.deleteOne(+id);
  }
}
