import express from "express";
const router = express.Router();
import DB from "../models/index.js";
const STUDENT = DB.models.tbl_student;
const SUBJECT = DB.models.tbl_subject;
const CODE = DB.models.tbl_code;

/* GET home page. */
router.get("/", async (req, res, next) => {
  const rows = await STUDENT.findAll();
  // return res.json(rows);
  return res.render("layout", { rows });
});

router.get("/detail/:st_num", async (req, res) => {
  const st_num = req.params.st_num;
  const student = await STUDENT.findByPk(st_num);
  const rows = await STUDENT.findAll();
  // return res.json(student);
  const code = await CODE.findAll({
    where: {
      r_stcode: st_num,
    },
    include: {
      model: SUBJECT,
      as: "r_과목",
    },
  });

  // return res.json(code[2]);
  return res.render("index", { rows, student, code });
});

export default router;
