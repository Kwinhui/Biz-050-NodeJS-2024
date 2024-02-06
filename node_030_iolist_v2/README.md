# Sequelize DBMS 핸들링

- sequelize 를 사용할때 Table 에 대한 Model을 생성한다.
- 수동으로 Model 을 생성하고, 프로젝트를 시작하면 Table 을 자동으로 만드는 기능이 프로젝트에 추가된다.
- 지금 프로젝트는 이미 생성되어 있는 `ecountDB` 를 대상으로 프로젝트를 진행할 예정이다.
- DB Schema 를 자동으로 생성해주는 도구를 사용하여 DB 구성을 만들것이다.

## Sequelize 자동화 도구를 사용하여 DB Schema 만들기

- 도구테스트 : shell 에서 `npx sequelize-auto` 명령 실행 해 보기

```bash
npm install -g mysql2
npm install -g sequelize-auto
sequelize-auto -o "./models" -d edb -h localhost -u root -x '!Biz8080' -e mysql -l esm
```

## 로그인 수행하기

- 기본 `http` 프로토콜은 `(연결)상태가 없다.`
- client 가 `request(요청)`을 하면, server 는 `response(응답)`을 한다.
- 한번에 이 과정이 끝나면 연결이 종료된다.
- client 와 server 간에 요청, 응답이 진행되는 동안 server 는 사용자에 대한 정보를 알고 싶을때가 있다.
- 최초의 사용자 인증은 `http://server/book@n96js:12341234` 와 같이 사용자의 정보를 요청하고 server 에서 인증을 수행하였다. 이 방식은 사용자의 중요 정보(id,password)가 매우 쉽게 노출되어 버린다.

### Cookie 의 사용

- 사용자의 로그인 절차를 수행한다.
- 서버에서 사용자의 정보를 조회하여 정상 사용자 인지 검증
- 검증된 사용자의 정보를 문자열로 변환하여 응답한다.
- 응답을 하면서 사용자의 정보를 `cookie` 영역에 저장해 달라고 `Browser`에게 요청한다.
- `Browser`는 `Cookie` 영역에 사용자 정보를 저장한다.
- 이때, 사용자의 여러 중요 정보가 평문(평범한 문자열, plan text)으로 `Browser`에 저장된다. -이 `Cookie` 영역은 누구나 쉽게 열어볼 수 있다. 때문에 사용자의 정보가 쉽게 노출되는 문제는 여전하다.

## Session 을 사용한 로그인 구현

- 사용자의 로그인 절차를 수행한다 : 로그인 하기
- 서버에서 사용자 정보를 받아서 인증절차를 수행한다 : DB등과 연계
- 인증이 완료가 되면 서버의 기억장치의 `Session 영역`에 사용자 정보를 저장
- 저장된 사용자 정보를 식별할 수 있는 `ID(Session ID)`발행(생성)한다.
- `reponse` 정보에 `Session ID`를 담아서 응답한다.
- 이후에 client 에서 server 로 어떤 요청이든지 실행되면 Browser 에 의해 `Session ID` 가 request 에 담겨서 서버로 전달된다.
- server 에서 만약 사용자의 인증이 필요한 `URL` 에 대한 요청이 오면 request 에 함께 전달된 `Session ID` 를 검사한다.
- 유효한 `Session ID`임이 판정되면, Session 영역에서 데이터를 가져와서 사용할 수 있도록 해 준다.

### nodejs 서버에서 Session 을 사용한 Login 구현

- dependency 설치 : `npm install express-session`
- `app.js` 에 session 설정

### 회원정보 암호화

- 회원가입을 할때 비밀번호를 암호화 하여 Table 에 저장하고 비밀번호를 보호한다.

### 암호화 기법

- 평문(일상적인 문자열)을 특별한 방법으로 알아보기 힘든 문자열로 변환하여 네트워크를 통하여 전송하고, 받는 쪽에서는 다시 특별한 방법으로 평문으로 변환하여 사용하는 방법

- `암호화 키`를 사용하여 특별히 만들어진 함수에 평문과 함께 입력하여 함수 내부에서 여러가지 알고리즘을 통하여 변형된 문자열을 출력하는 방법

- `암호화 키`는 평문을 암호문으로 변환할때, 암호문을 평문으로 변환할때 사용하는 매개변수이다.
- `암호화 기법`에서 `암호화 키`를 어떻게 취급할 것인가가 매우 중요한 키워드가 된다.

- 암호화 기법에는 `단방향 암호화`와 `양방향 암호화`가 있다.
- `암호화 키`를 취급하는 방법에는 `비밀키 방식`과 `공개키 방식`이 있다.
- 현재 사용되는 암호화 알고르짐은 성능, 보안성 등에 따라 매우 다양한 방법이 사용되고 있다.
- 해킹 기술이 발달하면서, 더욱더 암호화 알고리즘은 복잡해지고 다양해지고 있다.

### 단방향 암호화, 양방향 암호화

- `암호화` : 평문을 변형된 암호문자열로 변환 하는 것
- `복호화` : 변형된 암호문을 평문으로 다시 변환 하는 것
- `양방향 암호화`는 `암호화`와 `복호화`를 동시에 지원하는 방법
- `단방향 암호화`는 `암호화`는 지원하는데 `복호화`가 불가능한 방법

- `양방향 암호화`는 데이터를 주고 받을때 주로 사용한다.
- `단방향 암호화`는 회원가입, 로그인 등에서 주로 사용하는데, 회원가입을 할때 입력한 비밀번호를 암호화 하여 Table 에 저장하고, 로그인을 할때 입력한 비밀번호를 다시 암호화 하여 Table 에 저장한 값과 비교한다.
- `단방향 암호화`는 암호문 해독을 어렵게 하여 정보를 보호하는 목적이 크다.
- `양방향 암호화`는 데이터를 주고 받는 과정에서 탈취된 정보를 보호하는 목적이 크다.