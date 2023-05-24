import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from './user.entity';

@Injectable() //다른곳에서도 JwtStrategy 사용할 수 있게끔 세팅
export class JwtStrategy extends PassportStrategy(Strategy) {
  //이 Strategy가 import되오는 곳은 passport-jwt임

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository, //userRepo 주입 이유 : 나중에 토큰이 유효한지 확인 한 다음
  ) //payload안에 있는 해당 user이름 정보를 이용해서 데이터베이스의 해당 유저의 모든 정보를 가져오기 위해
  {
    super({
      secretOrKey: 'Secret1234', //토큰의 유효성 확인
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload) {
    const { username } = payload; //페이로드안에 있는 username뽑기
    //user에는 User타입을 주고
    const user: User = await this.userRepository.findOne({
        where: { username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user
  }
}
