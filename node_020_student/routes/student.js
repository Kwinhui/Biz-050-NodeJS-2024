import mysql from "mysql2";

import express from "express";
// express 프레임워크에 있는 Router() 생성자 함수를 사용하여
// router 객체를 만들기
const router = express.Router();
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!Biz8080",
  database: "schooldb",
  port: "3306",
});

router.get("/", async (req, res) => {
  // 연결
  // dbConn.connect();
  // select문 전송
  dbConn.query("SELECT * FROM tbl_student", (err, result, field) => {
    // SELECT * FROM tbl_student 가 성공하면 뒤에있는 함수 ()=> 를 실행해라
    if (err) {
      console.log(err);
      // 문자열을 그대로 보내라
      return res.send("DB 연결 Query 오류");
    } else {
      // json 타입으로 바꿔 응답하라
      //   return res.json(result);
      // html로 바꿔서 보내라
      return res.render("student/list", { stList: result });
      // stList에 result 값을 담아서 list.pug에 보내줘
    }
  });
  // dbConn.end();

  // res.send("학생정보");
  // 누군가 요청을 하면 학생정보 라는 문자열 출력
});

// localhost:3000/student/insert
router.get("/insert", (req, res) => {
  res.render("student/input");
});

router.post("/insert", (req, res) => {
  // form.post 의 input 에 담긴 데이터를 받아서 배열로 생성하기
  const params = [req.body.st_num, req.body.st_name, req.body.st_dept];
  const sql = " INSERT INTO " + " tbl_student(st_num, st_name, st_dept) " + " VALUES(?,?,?) ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.send("INSERT SQL 오류");
    } else {
      // 리스트 보여주기
      return res.redirect("/student");
    }
  });
});

/**
 * 변수를 보여줌
 * /book/detail?book_code=0003
 * /book/0003/detail
 * 변수를 안보여줌
 */

router.get("/:st_num/detail", (req, res) => {
  // :st_num/detail 변수를 안보여줌
  const st_num = req.params.st_num;
  const sql = " SELECT * FROM tbl_student " + " WHERE st_num = ? ";
  dbConn.query(sql, [st_num], (err, result) => {
    res.json(result);
  });
});

// router 객체를 컴포넌트로 만들어 export 하기
export default router;
