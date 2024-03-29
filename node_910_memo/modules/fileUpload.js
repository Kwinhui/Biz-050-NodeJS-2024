import path from "path";
import multer from "multer";
import { existsSync, mkdirSync } from "node:fs";
import { v4 as uuidv4 } from "uuid";
// 프로젝트의 root 폴더
const appRoot = process.env.PWD;
// public 폴더에 images 폴더
const upLoadFolder = path.join(appRoot, "public", "images");

// 파일 업로드를 위한 multer 설정

// 업로드를 시도할때 파일을 저장할 폴더를 관리할 함수
const destination = async (req, file, callback) => {
  // 파일을 업로드 할 폴더가 없으면
  if (!existsSync(upLoadFolder)) {
    // 폴더 생성
    mkdirSync(upLoadFolder, { recursive: true });
  }
  // 실제 multer 에게 upLoadFolder 정보 알려주기
  callback(null, upLoadFolder);
};
// 업로드할때 파일이름을 변경하는 용도의 함수
const filename = async (req, file, callback) => {
  // 원본파일에 uuid 값을 부착하여 새로운 파일이름 만들기
  const uploadFileName = `${uuidv4()}-${file.originalname}`;
  callback(null, uploadFileName);
};
const storage = multer.diskStorage({ destination, filename });
// 파일 업로드 크기 제한 : 1KBYTE * 1KBYTE * 2 = 2MBYTE
const limits = { filesize: 1024 * 1024 * 2 };
// json 으로 보내주기 {}
const upLoad = multer({ storage, limits });

export { upLoad };
