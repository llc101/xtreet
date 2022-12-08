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
import { CreateFeedDto } from './dto';
import { FeedbackService } from './feedback.service';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateFeedDto) {
    return this.feedbackService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Patch(':id')
  updateOne(@Body() dto: CreateFeedDto, @Param('id') id: string) {
    return this.feedbackService.updateOne(dto, +id);
  }

  @Auth(Role.ADMIN, Role.MODERATOR)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.feedbackService.deleteOne(+id);
  }
}
