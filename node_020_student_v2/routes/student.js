/**
 * express 프레임워크를 사용하여
 * router 객체 생성
 */
import express from "express";

/**
 * mysql.js 에서 선언하고 export 한 dbCreate 를
 * import 하여 DB 라는 이름으로 사용하겠다.
 */
import DB from "../config/mysql.js";
const router = express.Router();
// dbCreate 에서 선언된 init 함수를 호출하여
// return 된 정보를 dbConn 변수(객체)에 저장하라
const dbConn = DB.init();
// localhost:3000/student/
router.get("/", async (req, res) => {
  // 문자열을 아무런 가공, 디자인 없이 그대로 client 에게 응답하기
  // res.send("누군가 나를 호출(req) 했네");
  const sql = " SELECT * FROM tbl_student ";
  dbConn.query(sql, (err, result) => {
    // sql 데이터를 나에게 줘, > 결과는 result에 담고 오류는 err에 담아줘 라는 함수
    if (err) {
      // 오류가 발생했으면 오류보여줘
      return res.json(err);
    } else {
      // 오류가아니면 데이터보여줘
      // return res.json(result);
      return res.render("student/list", { stList: result });
      // 서버로부터 조회된 결과 result를 stList 라는 이름으로
      // 담아서 student/list.pug에 담아라
    }
  });
  //
});

// input router 를 만드는 코드
// GET: localhost:3000/student/insert
router.get("/insert", async (req, res) => {
  res.render("student/input.pug");
});

// POST: localhost:3000/student/insert
router.post("/insert", (req, res) => {
  // form 을 통해 전달된(전송된) 데이터를 (임시)변수에 저장해 두기
  const st_num = req.body.st_num;
  const st_name = req.body.st_name;
  const st_dept = req.body.st_dept;

  // DB에 insert 하기 위해 배열type 으로 변환
  // const params = [req.body.st_num, req.body.st_name, req.body.st_dept];
  const params = [st_num, st_name, st_dept];
  const sql = " INSERT INTO tbl_student(st_num, st_name, st_dept) " + " VALUES( ?, ?, ? ) ";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // INSERT(추가)가 성공한 경우 List 를 보여주는 화면으로
      // 화면 전환하라
      return res.redirect("/student/");
    }
  });
});

// GET: localhost:3000/student/홍길동/detail
// GET: localhost:3000/student/이몽룡/detail
// GET: localhost:3000/student/학번/detail 요청을 하면
// 주소 중간에 끼워넣어진 학번을 st_num 변수를 통하여 받아라
// 콜론(:)을 적으면 변수가 됨
router.get("/:st_num/detail", (req, res) => {
  // 주소에 포함되어 전달된 값을 변수에 저장하기
  const st_num = req.params.st_num;
  const params = [st_num];
  const sql = " SELECT * FROM tbl_student WHERE st_num = ? ";
  // ?에 st_num 값을 넣어서 보여줘
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // return res.json(result);
      // result에서 0번째 친구만 STD에 담아라?
      return res.render("student/detail", { STD: result[0] });
    }
  });
});

// router 객체를 다른곳에서 import 할수 있도록 export 하기
export default router;
