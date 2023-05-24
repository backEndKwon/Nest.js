import { DataSource, EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Board } from './board.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
      super(Board, dataSource.createEntityManager());
    }
//   async getBoardById(id: number) {
//     return await this.findOneBy({boardId: id});
//   }
}