import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    //비밀번호 저장시 암호화
    const salt = await bcrypt.genSalt(); //salt세팅
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //해당코드는 log보고 알아야됨
        throw new ConflictException('중복된 닉네임입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
