import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status-enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';//누가 전체게시물 조회했는데 log남기게 해줌

@Controller('boards')
@UseGuards(AuthGuard()) //이렇게만 해도 밑에 있는 것들 다 영향을 받게됨(사용자인증 미들웨어라고 보면된다)
export class BoardsController {
  private logger = new Logger(`BoardsController`);//누가 전체게시물 조회했는데 log남기게 해줌
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username}trying to get all boards`);//누가 전체게시물 조회했는데 log남기게 해줌
    return this.boardsService.getAllBoards();
  }

  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // @Post('/')
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() CreateBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(CreateBoardDto);
  // }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() CreateBoardDto: CreateBoardDto,
  @GetUser() user:User): Promise<Board> {
    //CreateBoardDto 객체를 매개변수로 받으며, body데코레이터를 통해 post에서 parsing해온 body객체를 가르킨다
    //메소드의 반환값은 Promise<Board> 타입
    //새로운 객체를 생성해서 비동기적으로 처리해주기(비동기쪽이 요청이 완료된 후에 결과를 반환하므로 프로그램 실행흐름관리가 쉬워진다.)
    this.logger.verbose(`User ${user.username} creating a new boards. Payload:${JSON.stringify(CreateBoardDto)}`);//누가 전체게시물 조회했는데 log남기게 해줌

    return this.boardsService.createBoard(CreateBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Get('/:id')
  // getBoardById(@Param() params: string[]): Board {
  //   return this.boardsService.getBoardById(params['id'])
  // }
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }
  // @Delete('/:id')
  // deleteBoard(@Param() params: string[]): void {
  //   this.boardsService.deleteBoard(params['id'])
  // }
  @Patch('/:id')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
// @Patch('/:id/status')
// updateBoardStatus(
//     @Param('id') id: string,
//     @Body('status', BoardStatusValidationPipe) status: BoardStatus
//   ) {
//   return this.boardsService.updateBoardStatus(id, status)
// }
