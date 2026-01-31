import {ConflictException, Injectable} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private readonly configService: ConfigService,
  ){}

  async userCreate(signupDto: SignupDto){
      const selectUserId = await this.userRepository.findOne({
          where:  {loginId: signupDto.loginId }
      })

      if(selectUserId){
          throw new ConflictException('이미 있는 아이디입니다.');
      }

      const hashedPassword = await bcrypt.hash(signupDto.userPw, 10);

      const MEMBER_CODE = this.configService.get<string>('MEMBER_CODE');

      const memberCode = signupDto.memberCode;

      if(MEMBER_CODE !== memberCode){
          throw new ConflictException('올바른  코드가 아닙니다.')
      }

      const isAdmin = MEMBER_CODE !== memberCode;

      const newUser = this.userRepository.create({
          loginId: signupDto.loginId,
          userPw: hashedPassword,
          userName: signupDto.userName,
          userNickName: signupDto.userNickName,
          agreeTerms: signupDto.agreeTerms,
          agreePrivacy: signupDto.agreePrivacy,
          isAdmin: isAdmin,
      });

      try{
          await this.userRepository.save(newUser);
      } catch(e: any){
          if (e?.code === '23505'){
              throw new ConflictException('이미 있는 아이디입니다.');
          }
          throw e;
      }

  }
}
