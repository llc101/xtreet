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
import { CreateProductDto, EditProductAdminDto, EditProductDto } from './dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: EditProductAdminDto, @Param('id') id: string) {
    return this.productService.updateOne(dto, +id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch('/mine/:id')
  updateMine(
    @Body() dto: EditProductDto,
    @Param('id') id: string,
    @User() user: any,
  ) {
    return this.productService.updateMine(dto, +id, user.id);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.productService.deleteOne(+id);
  }

  @Auth(Role.ADMIN)
  @Delete('/mine/:id')
  deleteMine(@Param('id') id: string, @User() user: any) {
    return this.productService.deleteMine(+id, user.id);
  }
}
