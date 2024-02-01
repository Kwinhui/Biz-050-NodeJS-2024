import express from "express";
import DB from "../models/index.js";

const ioList = DB.models.tbl_iolist;
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rows = await ioList.findAll();

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
export default router;
