//이 부분은 entity에 저장을 해두었으므로 삭제 가능
// export interface Board {
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus;
//   }
  
  export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
  }