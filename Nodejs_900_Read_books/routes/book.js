import express, { json } from "express";
import DB from "../config/mysql.js";
const router = express.Router();
const dbConn = DB.init();

router.get("/", (req, res) => {
  const sql = " SELECT * FROM tbl_books ";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json();
    } else {
      //   return res.json(result);
      return res.render("book/list", { bkList: result });
    }
  });
});
// router.get("/", (req, res) => {
//   res.render("book/list");
// });

// 도서등록 버튼을 클릭했을때 inputpage 로 넘어감
router.get("/input", (req, res) => {
  res.render("book/input");
});

router.post("/input", (req, res) => {
  const bk_isbn = req.body.bk_isbn;
  const bk_title = req.body.bk_title;
  const bk_author = req.body.bk_author;
  const bk_publisher = req.body.bk_publisher;
  const bk_price = req.body.bk_price;
  const bk_discount = req.body.bk_discount;
  const params = [bk_isbn, bk_title, bk_author, bk_publisher, bk_price, bk_discount];
  const sql = " INSERT INTO tbl_books(bk_isbn, bk_title, bk_author, bk_publisher, bk_price, bk_discount ) VALUES (?, ?, ?, ?, ?, ?) ";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/book");
    }
  });
});

router.get("/list", (req, res) => {
  res.redirect("/book");
});

router.get("/:bk_isbn/detail", (req, res) => {
  const bk_isbn = req.params.bk_isbn;
  const params = [bk_isbn];
  const sql = " SELECT * FROM tbl_books WHERE bk_isbn = ? ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("book/detail", { BKL: result[0] });
    }
  });
});

router.get("/join", (req, res) => {
  res.render("book/join");
});

router.post("/join", (req, res) => {
  const memId = req.body.m_id;
  const memPassword = req.body.m_password;
  const memEmail = req.body.m_email;
  const memName = req.body.m_name;
  const params = [memId, memPassword, memEmail, memName];
  const sql = " INSERT INTO tbl_members (m_id, m_password, m_email, m_name) VALUES (?, ?, ?, ?) ";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("회원가입 완료");
    }
  });
});

export default router;
