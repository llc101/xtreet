import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Role } from '../auth/dto';
import { Auth, Public, User } from '../decorators';
import { CreateUserDto, EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Auth(Role.MODERATOR, Role.ADMIN)
  @Patch(':id')
  updateOne(@Body() dto: EditUserDto, @Param('id') id: string) {
    return this.userService.updateOne(dto, +id);
  }

  @Auth(Role.USER)
  @Patch()
  updateSelf(@Body() dto: EditUserDto, @User() user: any) {
    return this.userService.updateOne(dto, user.id);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(+id);
  }
}
