import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import {  BoardStatus } from './board-status-enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

@Get()
getAllBoards() : Promise<Board[]>{
  return this.boardsService.getAllBoards()
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
createBoard(@Body() CreateBoardDto:CreateBoardDto):Promise<Board>{
  //CreateBoardDto 객체를 매개변수로 받으며, body데코레이터를 통해 post에서 parsing해온 body객체를 가르킨다
  //메소드의 반환값은 Promise<Board> 타입
  //새로운 객체를 생성해서 비동기적으로 처리해주기(비동기쪽이 요청이 완료된 후에 결과를 반환하므로 프로그램 실행흐름관리가 쉬워진다.)
  return this.boardsService.createBoard(CreateBoardDto)
}


@Get('/:id')
getBoardById(@Param('id') id:number):Promise<Board>{
return this.boardsService.getBoardById(id)
}

  // @Get('/:id')
  // getBoardById(@Param() params: string[]): Board {
  //   return this.boardsService.getBoardById(params['id'])
  // }
@Delete('/:id')
deleteBoard(@Param('id',ParseIntPipe)id):Promise<void>{
  return this.deleteBoard(id)
}
  // @Delete('/:id')
  // deleteBoard(@Param() params: string[]): void {
  //   this.boardsService.deleteBoard(params['id'])
  // }
  @Patch("/:id")
  updateBoardStatus(
    @Param("id",ParseIntPipe) id : number,
    @Body("status",BoardStatusValidationPipe)status: BoardStatus ){
    return this.boardsService.updateBoardStatus(id,status)
  }}
  // @Patch('/:id/status')
  // updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
  //   ) {
  //   return this.boardsService.updateBoardStatus(id, status)
  // }

