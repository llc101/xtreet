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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: CreateCategoryDto, @Param('id') id: string) {
    return this.categoryService.updateOne(dto, +id);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.categoryService.deleteOne(+id);
  }
}
