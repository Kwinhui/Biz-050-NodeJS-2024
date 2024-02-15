import express from "express";
const router = express.Router();
import DB from "../models/index.js";
import moment from "moment";
import { Op } from "sequelize";
import { upLoad } from "../modules/file_upload.js";
const MEMO = DB.models.tbl_memo;

/* GET home page. */
router.get("/", async (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  const time = moment().format("hh:mm");
  const row = await MEMO.findAll();
  return res.render("index", { MEMO: row, today, time });
});
router.get("/input", async (req, res) => {
  return res.render("memo/input");
});
router.post("/input", upLoad.single("m_image"), async (req, res) => {
  const data = req.body;
  const today = moment().format("YYYY-MM-DD");
  const time = moment().format("hh:mm");
  const file = req.file;
  if (file) {
    req.body.m_image_name = file.filename;
    req.body.m_image_origin_name = file.originalname;
  }
  req.body.m_date = today;
  req.body.m_time = time;
  req.body.m_author = "n96js@naver.com";
  try {
    await MEMO.create(data);

    return res.redirect("/");
  } catch (error) {
    return res.json(error);
  }
});
router.get("/:m_seq/detail", async (req, res) => {
  const m_seq = req.params.m_seq;
  try {
    const row = await MEMO.findByPk(m_seq);
    return res.render("memo/detail", { MEMO: row });
  } catch (error) {
    return res.json(error);
  }
});
router.get("/:m_seq/update", async (req, res) => {
  const m_seq = req.params.m_seq;
  try {
    const row = await MEMO.findByPk(m_seq);
    return res.render("memo/input", { MEMO: row });
  } catch (error) {
    return res.json(error);
  }
});
router.post("/:m_seq/update", async (req, res) => {
  const data = req.body;
  const m_seq = req.params.m_seq;
  try {
    await MEMO.update(data, { where: { m_seq: m_seq } });
    // return res.json(data);
    console.log(data);
    return res.redirect(`/${m_seq}/detail`);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:m_seq/delete", async (req, res) => {
  const m_seq = req.params.m_seq;
  try {
    await MEMO.destroy({ where: { m_seq } });
    return res.redirect("/");
  } catch (error) {
    return res.json(error);
  }
});

export default router;
