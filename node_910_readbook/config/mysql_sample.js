import mysql from "mysql2/promise";
const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "000000",
  database: "bookdb2",
};

/**
 * 동기식으로 DB 연결 설정하기
 * async() 로 시작하고
 * 각 실행 함수 앞에 await 를 붙여주면
 * await 로 시작하는 함수가 완료될때까지 blocking 된다.
 */

const dbCreate = {
  init: async () => {
    const connection = await mysql.createConnection(mysql_info);
    // async, await 연결 정보를 동기식으로 쓰겠다
    // db가 connection 될때까지 멈춰있음
    return connection;
  },
};

export default dbCreate;
