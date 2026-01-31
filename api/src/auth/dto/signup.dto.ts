import {IsBoolean, Equals, IsString, IsDefined,
    MaxLength, MinLength, Matches } from 'class-validator';

export class SignupDto {
    @IsString()
    @MaxLength(50)
    loginId: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/, {
        message: 'userPw는 영문/숫자/특수문자를 각각 1개 이상 포함하고 공백이 없어야 합니다.',
    })
    userPw: string;

    @IsString()
    @MaxLength(50)
    userName: string;

    @IsString()
    @MaxLength(100)
    userNickName: string;

    @IsDefined()
    @IsBoolean()
    @Equals(true)
    agreeTerms: boolean;

    @IsDefined()
    @IsBoolean()
    @Equals(true)
    agreePrivacy: boolean;

    @IsString()
    @MaxLength(100)
    memberCode: string;
}