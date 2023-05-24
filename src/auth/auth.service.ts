import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  //UserRepo 주입
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialDto:AuthCredentialDto):Promise<void>{
    return this.userRepository.createUser(authCredentialDto)
  }

  async signIn(authCredentialDto:AuthCredentialDto):Promise<string>{
    const {username, password} = authCredentialDto;
    const user = await this.userRepository.findOne({where:{username}})
    if(user && (await bcrypt.compare(password, user.password))){
        return "login 성공"
    }else{
        throw new UnauthorizedException('login 실패')
    }
  }
}