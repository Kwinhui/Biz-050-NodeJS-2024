import express from "express";
import DB from "../models/index.js";

const ioList = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;
const PRODUCTS = DB.models.tbl_products;
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rows = await ioList.findAll({
      include: [
        { model: PRODUCTS, as: "IO_상품" },
        { model: DEPTS, as: "IO_거래처" },
      ],
    });
    // return res.json(rows);

    return res.render("iolist/list", { ioList: rows });
  } catch (error) {
    return res.json(error);
  }
});
router.get("/insert", (req, res) => {
  const user = req.session?.user;
  // 세션에 담긴 user정보를 꺼냄
  if (user) {
    return res.render("iolist/input");
  } else {
    const message = "로그인이 필요한 서비스 입니다";
    return res.redirect(`/users/login?fail=${message}`);
  }
});

router.get("/:io_seq/detail", async (req, res) => {
  const seq = req.params.io_seq;
  const row = await ioList.findByPk(seq);
  return res.render("iolist/detail", { IO_ITEM: row });
});
router.get("/:io_seq/delete", async (req, res) => {
  const seq = req.params.io_seq;
  const row = await ioList.findByPk(seq);
  // io_delete 값 1 설정후 save
  row.io_delete = 1;
  await row.save();
  return res.redirect("/iolist");
});

router.get("/count", async (req, res) => {
  const rows = await ioList.findAll();
  return res.json({ count: rows.length });
});

export default router;
