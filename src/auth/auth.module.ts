import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])], //UserRepo가져와서 다른곳에서도 쓸수있게
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
