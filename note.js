/*
async createBoard(createBoardDto:CreateBoardDto):Promise<Board>{
  
  const {title, description} = createBoardDto;
  const board = this.boardRepository.create({
    title,
    description,
    status : BoardStatus.PUBLIC
  })
  await this.boardRepository.save(board)//service단에서 repository에 저장
  return board
}
promise사용하는 이유
비동기 처리를 위한 객체임 async/await구문은 내부적으로 promise를 사용하며 promise를 반환하는함수는 비동기 처리가 필요하다는 것임
async/await 구문은 promise 객체를 사용하지만, 내부적으로 비동기 처리를 동기적으로 다룰 수 있도록 도와줍니다. 따라서 async/await 구문에서 promise 객체를 직접적으로 다루는 대신에, async 함수 내부에서 Promise 객체가 선언된 함수나 메소드를 await 키워드를 사용하여 호출하면 됩니다.

왜냐하면 async/await 구문을 사용하지 않으면, 함수가 반환하는 promise 객체를 then()과 catch() 같은 콜백 함수 안에서 처리해야하므로 코드의 가독성이 떨어지고 복잡해집니다. 반면에, async/await 구문을 사용하면 코드의 가독성을 높이면서도, 비동기 처리의 처리 순서와 기타 여러가지 처리를 쉽게 다룰 수 있습니다.

따라서, async 함수 내부에서 Promise 객체를 반환할 경우 await을 사용해야 하는 것이 바람직합니다. 반면에 async 함수가 아닌, 다른 함수에서 Promise 객체를 반환할 경우에는 then()과 catch() 같은 콜백 함수를 사용하는 것이 좋습니다.

>>>remove, delete 차일
리무브 : 무조건 존재하는 아이템을 지운다. 없다면 에러발생
딜리트 : 없어도 이상없음

>>>auth모듈만들기
nest g module auth
nest g controller auth --no-spec
nest g service auth --no-spec

>>>bcrypt (비크립트)
비밀번호 암호화해서 저장하기 
npm install bcryptjs --save
hash방식보다는 salt방식이 안전하다
왜? 서로다른 유저a,b의 비밀번호가 1234라면
유저a=1234 => hash에서는 zbcd123 / salt에서는 zxcv12399
유저b=1234 => hash에서는 zbcd123 / salt에서는 zxcv123100과 같이 달라짐

>>>jwt
모듈설치
npm install @nestjs/jwt @nestjs/passport passport passport-jwt --save
npm install @types/passport-jwt --save
구조 = header.payload.verifySignature
header : 타입,알고리즘 방식
payload : 발급날짜 및 유저 정보, 만료시간 등 
verify : header와 payload만드는 방식+ 시크릿text

해당 토큰으로 유저인지 아닌지 비교 => 
클라이언트에서온 header, payloade, 서버에서 가지고 있는 secret Text를 비교

>>>passport

>>>middleware nestjs에는 여러가지 미들웨어가 있는데 그중 4개
Pipes - 유효성검사 및 페이로드 변환을 위해 //유효성 체크, 데이터 변환해주는 요청을 보낼때 요청이 컨트롤러에 도달하기 전에 클라이언트에서 보낸값들을 정수면 정수로 변환해주는)
Filters - 오류처리 미들웨어
Guards - 인증미들웨어(사용자인증 같은거)
Interceptors - 응답 매핑 및 캐시관리와 함께 요청 로깅과 같은 전후 미들웨어
각각의 미들웨어가 불러지는 순서
미들웨어 > 가드 > 인터셉터 > 파이프 > 컨트롤러 > 서비스 > 컨트롤러 > 인터셉터 > 필터 > 클라이언트

>>>req.user로 user객체를 얻는 방법이 아닌 바로 user라는 파라미터로 가져올 방법은? 커스텀 데코레이터 이용
굳이 안쓰고 req로 받아도됨

*/