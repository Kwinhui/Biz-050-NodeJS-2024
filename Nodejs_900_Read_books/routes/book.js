import express from "express";
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

router.get("/input", (req, res) => {
  res.render("book/input");
});

export default router;
