import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ], //UserRepo가져와서 다른곳에서도 쓸수있게
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],//현재 auth모듈에서 사용하기 위해
  exports:[JwtStrategy,PassportModule]//다른 모듈에서 사용하기 위해
})
export class AuthModule {}
