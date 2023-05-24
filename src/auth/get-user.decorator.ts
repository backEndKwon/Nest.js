import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    //data와 ctx라는 파라미터 두개

    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
