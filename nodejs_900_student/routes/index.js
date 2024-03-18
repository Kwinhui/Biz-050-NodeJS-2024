import express from "express";
import DB from "../models/index.js";
const router = express.Router();
const STUDENT = DB.models.tbl_student;
const SUBJECT = DB.models.tbl_subject;
const CODE = DB.models.tbl_code;
/* GET home page. */
router.get("/", async (req, res, next) => {
  const codes = await CODE.findAll({
    include: {
      model: SUBJECT,
      as: "r_과목",
    },
  });

  const rows = await STUDENT.findAll();

  // return res.json(code);
  // return res.json(subject[0].tbl_codes[0]);
  // return res.json(row);
  // console.log("su_code :  ", su_code);
  res.render("index", { result: rows, code: codes });
});

router.get("/:st_num/detail", async (req, res) => {
  const st_num = req.params.st_num;
  const row = await STUDENT.findByPk(st_num, {
    include: [
      {
        model: SUBJECT,
        as: "subject",
      },
      {
        model: CODE,
        as: "tbl_codes",
      },
    ],
  });

  console.log(row);
  return res.json(row);
  // return res.redirect("/");
});

router.get("/subject/:su_code", async (req, res) => {
  const su_code = req.params.su_code;

  const subject = await SUBJECT.findByPk(su_code);

  return res.json(subject);
});

export default router;
