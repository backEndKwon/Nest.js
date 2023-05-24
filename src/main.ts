import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get(`server`); //config파일에서 server적어놓은거 가져오는것임
  const port = serverConfig.port;

  await app.listen(port);
  Logger.log(`Application running on port ${port}`); //일부러 로그 남기기
}
bootstrap();
