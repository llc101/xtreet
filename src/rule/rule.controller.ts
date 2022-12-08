import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/decorators';
import { CreateRuleDto } from './dto';
import { RuleService } from './rule.service';

@Controller('rules')
export class RuleController {
  constructor(private ruleService: RuleService) {}

  @Post()
  create(@Body() dto: CreateRuleDto) {
    return this.ruleService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.ruleService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruleService.findOne(+id);
  }

  @Patch(':id')
  updateOne(@Body() dto: CreateRuleDto, @Param('id') id: string) {
    return this.ruleService.updateOne(dto, +id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.ruleService.deleteOne(+id);
  }
}
