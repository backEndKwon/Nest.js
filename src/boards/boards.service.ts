import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status-enum';
import { BoardRepository } from './boards.repository.js';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}


async getAllBoards() : Promise<Board[]>{
  return this.boardRepository.find()
}



  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
    // const {title, description} = createBoardDto;
    // const board = this.boardRepository.create({
    //   title,
    //   description,
    //   status : BoardStatus.PUBLIC
    // })
    // await this.boardRepository.save(board)//service단에서 repository에 저장
    // return board
  }
  //>>>게시글 조회
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`can't find board with id ${id}`);
    }
    return found;
  }
  // private boards: Board[] = []; //로컬메모리 부분이라 지워도 됨

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };

  //   this.boards.push(board);
  //   return board;
  // }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`요청하신 게시글을 찾을 수 없습니다.`);
  //   }
  //   return found;
  // }
  //>>>게시글 삭제
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    console.log('result', result); // 결과 값 : DeleteResult {raw:[], affected:1(만약 지울거 없었으면 0)}
    //remove로 하면 에러메세지가 자동으로 뜨지만 에러메세지 cutomized하려면 delete
    if (result.affected === 0) {
      throw new NotFoundException(`can't find board with id ${id}`);
    }
  }
  //>>>게시글 status업데이트
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
