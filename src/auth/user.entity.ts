import { Unique,BaseEntity,Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Unique(["username"])//이렇게하면 자동적으로 에러가 뜨게 됨(하지만 에러메세지는 고정임)
//냅두면 controller로 넘어가서 에러번호 500을 반환하니까 try,catch문으로 에러를 잡아서 오류메세지를 전달하는게 좋음
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
}
