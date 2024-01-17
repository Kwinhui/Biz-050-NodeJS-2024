import mysql from "mysql2";
/**
 * JSON(JavaScript Object Notation) Type 의 객체(JSON 데이터, JSON)
 * 속성데이터가 `변수명 : 값` 형식으로 구성된다.
 *       Key:Value pair type 데이터 라고 한다
 */

const mysql_info = {
  // 여기서 오류가 나면 dbCreate 함수가 실행되지 않음
  host: "localhost",
  port: "3306",
  user: "root",
  password: "!Biz8080",
  database: "schoolDB",
};

const dbCreate = {
  // init 함수생성
  init: () => {
    console.log("MySQL DBMS Connection");
    return mysql.createConnection(mysql_info);
  },
};

export default dbCreate;
