import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup( @Body() signupDto: SignupDto ){
    await this.authService.userCreate(signupDto);
    return { message:'회원가입 성공!'};
  }
}
