import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn();
  }

  @Post('/signup')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp();
  }

  @Get('/whoIm')
  whoIm(@Param() createAuthDto: CreateAuthDto) {
    return this.authService.whoIm();
  }

  @Post('/logout')
  logout(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.logout();
  }
}
