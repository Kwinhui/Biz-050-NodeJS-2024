import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";
const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;
const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await PRODUCTS.findAll({
    // 리스트10개로 제한
    limit: 10,
    // pcode 오름차순정렬
    order: [["p_code", "ASC"]],
  });
  return res.render("product/list", { PRODUCTS: rows });
});

router.get("/insert", (req, res) => {
  return res.render("product/input");
});

// router.get("/:pcode/detail", async (req, res) => {
//   const pcode = req.params.pcode;
//   const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });

//   return res.render("product/detail", { PRODUCT: row });
// });

router.get("/:pcode/detail2", async (req, res) => {
  const pcode = req.params.pcode;

  const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: PRODUCTS, as: "IO_상품" } } });

  console.log({ row });
  return res.render("product/detail2", { PRODUCT: row });
});

router.get("/insert", (req, res) => {
  return res.render("product/insert");
});
// single - 파일 1개만 받겠다, p_image - input.pug 파일의 name
router.post("/insert", upLoad.single("p_image"), (req, res) => {
  const file = req.file;

  return res.json({ body: req.body, file });
});

// router.post("/insert", (req, res) => {
//   PRODUCTS.create(req.body);
//   return res.redirect("product/list");
// });

router.get("/cancel", (req, res) => {
  return res.redirect("product/list");
});

export default router;
