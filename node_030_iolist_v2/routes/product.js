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
    // limit: 10,
    // pcode 오름차순정렬
    order: [["p_code", "DESC"]],
  });

  return res.render("product/list", { PRODUCTS: rows });
});

router.get("/insert", (req, res) => {
  return res.render("product/input");
});

router.get("/:pcode/detail", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });

  return res.render("product/detail", { PRODUCT: row });
});

// router.get("/:pcode/detail2", async (req, res) => {
//   const pcode = req.params.pcode;

//   const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: PRODUCTS, as: "IO_상품" } } });

//   console.log({ row });
//   return res.render("product/detail2", { PRODUCT: row });
// });

router.get("/insert", (req, res) => {
  return res.render("product/insert");
});
// single - 파일 1개만 받겠다, p_image - input.pug 파일의 name
// router.post("/insert", upLoad.single("p_image"), (req, res) => {
//   const file = req.file;

//   return res.json({ body: req.body, file });
// });

/**
 * 상품코드는 1자리의 Prefix(P)와 5자리의 연속된 일련번호 형식
 * 상품코드는 중복되면 절대안되고, 빈(blank, empty) 값도 안된다.
 * 규칙이 자릿수가 일정한 형태
 *
 * 새로운 상품코드를 생성하기 위하여
 * 1. 기존의 DB Table 에서 가장 큰 상품코드값을 추출
 * 2. Prefix 를 분리
 * 3. 숫자 부분을 분리
 * 4. 숫자 부분의 문자열을 숫자로 변경하고 + 1 실행
 * 5. Prefix 와 숫자 부분을 결합하여 코드로 생성
 * 6. 숫자 부분의 자릿수를 맞추고 공백 부분은 0으로 채워넣어야 한다.
 */
const makePCode = (pcode) => {
  const pCodePrefix = pcode.substring(0, 1);
  // 0번째부터 1번째 앞에까지 > P
  let pCodeNum = pcode.substring(1);
  // 1번 index 이후의 값(숫자부분), 만약 00014였다
  const pCodeNumLength = pCodeNum.length; // 문자열의 길이 추출

  pCodeNum = String(Number(pCodeNum) + 1); // pCode_Num 는 15가 된다
  pCodeNum = "0000000000" + pCodeNum;
  // pCodeNum = 12 이면
  // pCodeNum.length = 10자리의 숫자 + 12
  // 전체 pCodeNum 의 전체 길이(12) 에서 원래 코드 숫자부분의 길이 만큼 뺀 위치부터
  // 문자열 잘라내기
  pCodeNum = pCodeNum.substring(pCodeNum.length - pCodeNumLength);
  // 000000000012(12자리) - 00014(5자리)
  // 12 - 5 = 7
  // pCodeNum = pCodeNum.substring(7)
  // 00012
  return `${pCodePrefix}${pCodeNum}`;
};

const makePCodeNew = (pcode) => {
  const pCodePrefix = pcode.substring(0, 1);
  // P00051
  // 0번째부터 1번째 앞에까지 - P
  let pCodeNum = pcode.substring(1);
  // 1번 index 이후의 값 - 00051
  const pCodeNumLength = pCodeNum.length;
  // 00051 (5자리)
  pCodeNum = String(Number(pCodeNum) + 1);
  // 00052 > "52" (00052 숫자에서 "52"라는 문자로 바뀜)
  /**
   * 문자열.padStart(길이, 패턴)
   * 문자열 값을 전체 "길이" 개수만큼 만들고
   * 왼쪽에 비어있는 곳은 "패턴"으로 채워넣은 문자열을 생성하라
   */

  pCodeNum = pCodeNum.padStart(pCodeNumLength, "0");
  // 5자리에 52를 넣고 비어있는 3자리수 앞부분 000 채워넣기
  // 전체 5자리수중 원래 숫자를 채워넣고 비워진 앞부분 0 채워넣기
  // padEnd = 뒷부분 0 채워넣기
  return `${pCodePrefix}${pCodeNum}`;
};

router.post("/insert", upLoad.single("p_image"), async (req, res) => {
  let pCode = req.body.p_code;
  if (pCode === "000") {
    // findAll() 을 실행한 결과는 비록 SELECT 된 결과가 0개, 또는 1개 뿐이지만
    // 결과는 배열(List) Type 이다.
    const rows = await PRODUCTS.findAll({ order: [["p_code", "DESC"]], limit: 1 });
    pCode = rows[0].p_code;
    pCode = makePCodeNew(pCode);
    req.body.p_code = pCode;
  }

  const file = req.file;
  if (file) {
    req.body.p_image_name = file.filename;
    req.body.p_image_origin_name = file.originalname;
  }

  try {
    await PRODUCTS.create(req.body);
    return res.redirect("/products/");
  } catch (error) {
    return res.json(error);
  }

  // return res.json({ body: req.body, file });
});

// router.post("/insert", (req, res) => {
//   PRODUCTS.create(req.body);
//   return res.redirect("product/list");
// });

router.get("/cancel", (req, res) => {
  return res.redirect("product/list");
});

export default router;
