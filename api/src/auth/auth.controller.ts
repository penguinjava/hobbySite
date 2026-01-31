import { Controller, Post, Body } from '@nestjs/common';
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

  @Post('login')
  async login(){
    return { message: '로그인 성공!'};
  }

  @Post('refresh')
  async refresh(){
    return { message: '인증 재발급 성공!'};
  }

  @Post('logout')
  async logout(){
    return { message: '로그아웃 성공!'};
  }
}
