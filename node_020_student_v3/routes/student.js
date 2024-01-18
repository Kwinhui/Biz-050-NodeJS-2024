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

router.get("/:st_num/check", (req, res) => {
  const st_num = req.params.st_num;
  const sql = " SELECT st_num FROM tbl_student WHERE st_num = ? ";
  // 학번으로 조회해서 그 조회된 친구가 있으면 학번을 보여줘
  //
  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      // sql 문이 문제가 생기면 result 값에 ERROR를 담고
      // massage 에 err를 담아 보여줘
      res.json({ result: "ERROR", message: err });
    } else {
      if (result.length > 0) {
        return res.json({ result: "있다", STD: result[0] });
      } else {
        return res.json({ result: "없다", STD: null });
      }
    }
  });
});

router.get("/:st_num/delete", (req, res) => {
  const st_num = req.params.st_num;
  const sql = " DELETE FROM tbl_student WHERE st_num = ? ";
  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/student");
      // 리스트로 점프
    }
  });
});

// localhost:3000/student/학번/update
// form tag 의 action 이 자동으로 URL 이 설정된다.
router.get("/:st_num/update", (req, res) => {
  const st_num = req.params.st_num;
  const sql = " SELECT * FROM tbl_student WHERE st_num = ? ";
  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("student/input", { STD: result[0] });
    }
  });
});

router.post("/:st_num/update", (req, res) => {
  const st_num = req.params.st_num;
  // params 주소창에 있는 학번
  const st_name = req.body.st_name;
  // body input에 입력돼있는 데이터
  const st_dept = req.body.st_dept;
  const st_grade = req.body.st_grade;
  const st_tel = req.body.st_tel;
  const st_addr = req.body.st_addr;
  // 업데이트를 할 데이터
  // pk는 항상 마지막에
  // 학번을 기준으로 업데이트 해야하기 때문에
  // WHERE st_num = ? 을 마지막에 넣어야함
  const params = [st_name, st_dept, st_grade, st_tel, st_addr, st_num];
  const sql =
    " UPDATE tbl_student SET st_name = ?, " + " st_dept = ?, " + " st_grade = ?, " + " st_tel = ?, " + " st_addr = ? " + " WHERE st_num = ? ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect(`/student/${st_num}/detail`);
    }
  });
});

// router 객체를 다른곳에서 import 할수 있도록 export 하기
export default router;
