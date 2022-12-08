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
import { Auth, User } from '../decorators';
import { CreateModDto, EditModDto } from './dto';
import { ModeratorService } from './moderator.service';

@Controller('moderators')
export class ModeratorController {
  constructor(private moderatorService: ModeratorService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateModDto) {
    return this.moderatorService.create(dto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.moderatorService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderatorService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  updateOne(@Body() dto: EditModDto, @Param('id') id: string) {
    return this.moderatorService.updateOne(dto, +id);
  }

  @Auth(Role.MODERATOR)
  @Patch()
  updateSelf(@Body() dto: EditModDto, @User() user: any) {
    return this.moderatorService.updateOne(dto, user.id);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.moderatorService.deleteOne(+id);
  }
}
