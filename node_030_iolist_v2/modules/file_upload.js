/**
 * 파일이 업로드 되면
 * 업로드 된 파일을 저장폴더에 저장하는 미들웨어
 *
 */
// import fs from "fs"
// fs.existsSync()
// fs 모듈에서 existsSync() 함수와 mkdirSync() 함수만 사용하겠다
import { existsSync, mkdirSync } from "fs";
import path from "path";

// 폴더 이름
import multer from "multer";
// 파일
import { v4 as uuid } from "uuid";
// uuid 모듈에 있는 v4() 함수를 uuid 라는 이름으로 사용하겠다.

// 프로젝트의 물리적 저장소 경로(path)
// ~/Document/workspace/nodejs/node_030_iolist_v2
const appRoot = process.env.PWD;
// ~/Document/workspace/nodejs/node_030_iolist_v2/public/uploads
const upLoadPath = path.join(appRoot, "public", "uploads");

/**
 * multer 는 destination 과 filename 이라는 2개의 함수가 필요하다.
 * destination : 파일을 저장할 때 사용할 설정들
 * filename : 파일 이름에 대한 핸들링
 */

// client가 file > router > upLoad > req 순으로 흐름

// const upLoad = multer({
//   storage: multer.diskStorage({
//     // 파일을 어디에 어떻게 저장할것인지
//     destination: async (req, file, callback) => {
//       if (!existsSync(upLoadPath)) {
//         // !(~가 있으면) = 폴더가 없냐?
//         mkdirSync(upLoadPath, { recursive: true });
//         // recursive - 폴더가 없으면 다 만들어라
//       }
//       // multer 야 나머지는 네가 처리해
//       callback(null, upLoadPath);
//     },
//     // 파일이름에 대한 handling
//     filename: (req, file, callback) => {
//       callback(null, file.originalname);
//     },
//   }),
// });
const storageOption = {
  // 파일을 어디에 어떻게 저장할것인지
  destination: async (req, file, callback) => {
    if (!existsSync(upLoadPath)) {
      // !(~가 있으면) = 폴더가 없냐?
      mkdirSync(upLoadPath, { recursive: true });
      // recursive - 폴더가 없으면 다 만들어라
    }
    // multer 야 나머지는 네가 처리해
    callback(null, upLoadPath);
  },
  filename: (req, file, callback) => {
    // image name injection 해킹공격에 대비하여
    // 원래 이름을 변경하여 업로드 하도록 지시
    const upFileName = `${uuid()}-${file.originalname}`;
    callback(null, upFileName);
  },
};
const storage = multer.diskStorage(storageOption);
const upLoad = multer({ storage });

export { upLoad };
