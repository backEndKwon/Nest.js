import { Module } from '@nestjs/common';
import { BoardsModule } from './boards.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './commons/typeorm.config';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
})
export class AppModule {}