import express from "express";
import DB from "../config/mysql.js";
const router = express.Router();

/**
 * DB 연결을 시도하는 DB.init() 함수는 async 키워드가 부착되었다.
 * 이 함수는 동기방식으로 실행되는데,
 * 일반적인 변수 = DB.init() 방식으로 return 값을 받을 수 없다.
 * DB.init() 함수의 return 값은 .then() 함수를 통해서 받아야 한다.
 */

let dbConn = null;
// init() 함수에 async 가 설정되어 동기식으로 작동된다.
// 이 함수에 return 값을 받기 위해서는 .then() 함수를 통하여 받아야 한다.
DB.init().then((connection) => (dbConn = connection));
// DB.init() 함수의 리턴값이 만들어지면
// then : DB.init()가 전부다 완성될때까지 기다려
// 완성이되면 connection에 값을 넘겨줘
// connection은 실행이 끝나면 없어지니 그 값을 dbConn에 담아줘
// console.log("dbConn", dbConn);

// const dbConn = DB.init();
// console.log(dbConn);

router.get("/", (req, res) => {
  const sql = " SELECT * FROM tbl_books ";
  dbConn
    // query() 함수를 동기식으로 실행
    .query(sql)
    // query() 함수가 완료되면 .then() 함수에 결과를 전달한다.
    .then((rows) => {
      // 실행되면서 결과가 rows 에 담김
      // console.log(rows);
      return res.render("books/list", { books: rows[0] });
      // 실제 데이터는 0번 배열 data 이고 1번 data 는 table 의 구조가 출력이 된다
    })
    .catch((err) => {
      // 만약 실행중에 오류가 발생하면 .catch() 함수에게 결과를 전달한다.
      return res.render("db_error", err);
    });
  //   return res.render("books/main");
});

router.get("/insert", (req, res) => {
  return res.render("books/input");
});
router.post("/insert", (req, res) => {
  // mysql2 dependency 도구가 지원하는 확장된 INSERT 구문
  // 이 SQL 은 표준 SQL 이 아님
  const sql = " INSERT INTO tbl_books SET ? ";
  const params = {
    // []배열 {}JSON 데이터
    // req.body에서 데이터를 받아와서 변수에 담아두었지만
    // input.pug에서 name에 변수값을 넣어주지 않으면
    // 입력한 값이 서버로 전달할 수 없다
    isbn: req.body.isbn,
    title: req.body.title,
    publisher: req.body.publisher,
    author: req.body.author,
    // body에 담겨있는 data 는 모두 문자열이다
    // Number() 함수는 문자열을 실제숫자열형으로 바꿔줌
    price: Number(req.body.price),
    discount: Number(req.body.discount),
  };
  // return res.json(params);
  dbConn
    .query(sql, params)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      res.render("db_error", err);
    });
});

router.get("/:isbn/detail", (req, res) => {
  const isbn = req.params.isbn;
  console.log(isbn);

  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";

  dbConn
    .query(sql, isbn)
    .then((rows) => {
      // console.log(rows[0]);
      // rows 는 [[{}],[{}]] 이렇게 배열이 돼있기 때문에 [0][0] 값이 데이터값이다
      // return res.json(rows);
      return res.render("books/detail1", { book: rows[0][0] });
    })
    .catch((err) => {
      res.render("db_error", err);
    });
});
router.get("/:isbn/delete", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " DELETE FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((rows) => {
      return res.render("books/input", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

export default router;
