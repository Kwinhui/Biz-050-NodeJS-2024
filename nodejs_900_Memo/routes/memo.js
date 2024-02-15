import express from "express";
import DB from "../models/index.js";
import moment from "moment";
import { Op } from "sequelize";
const MEMO = DB.models.tbl_memo;
const router = express.Router();

// router.get("/:m_seq/update", async (req, res) => {
//   const m_seq = req.params.m_seq;
//   try {
//     const row = await MEMO.findByPk(m_seq);
//     return res.render("memo/input", { MEMO: row });
//   } catch (error) {
//     return res.json(error);
//   }
// });

export default router;
