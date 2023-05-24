import { UseGuards,Controller, Body, Post, ValidationPipe,  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {AuthGuard} from "@nestjs/passport"
import {User} from "./user.entity"
import {GetUser} from"./get-user.decorator"
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

@Post('./test')
// @UseGuards(AuthGuard())//이렇게 해야 요청안에 유저 정보를 넣어줄 수 잇음 @nestjs/passport에서 가져옴
// test(@Req() req){
//     console.log('req',req)//반환값 : user객체+부가적인내용 ~~~user:User{id:2, username:"john", password:"adsasdfsvkj12312j!!dfs(암호화된 비번)"~~~}
//    그래서 req.user로 user객체를 뽑아와야됨
//     }
@UseGuards(AuthGuard())
test(@GetUser() user:User){
    console.log("user",user)//반환 값:user객체만 있게됨 user:User{id:2, username:"john", password:"adsasdfsvkj12312j!!dfs(암호화된 비번)"
}
}

