import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../decorators';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
