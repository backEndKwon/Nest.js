import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //UserRepo 주입
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      //user토큰 생성(secret+payload 필요)로그인과 동시에 토큰 발급
      const payload = { username }; //payload에는 중요한 정보 넣으면 안됌
      const accessToken = await this.jwtService.sign(payload); //여기서 알아서 secret과 payload섞어서 만들어줌
      return { accessToken };
      // return "login 성공"
    } else {
      throw new UnauthorizedException('login 실패');
    }
  }
}
