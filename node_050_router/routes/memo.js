import express from "express";
import { upLoad } from "../modules/file_upload.js";
const router = express.Router();

// localhost:3000/memo
router.get("/", (req, res) => {
  res.render("memo");
});

router.get("/write", (req, res) => {
  res.send("Memo Writer");
});

router.get("/write/today", (req, res) => {
  res.send("Memo Today");
});

export default router;
