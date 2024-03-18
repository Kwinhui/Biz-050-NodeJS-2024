/**
 * express generator ES6+ Template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2024-01-19
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from "express";
import createError from "http-errors";
import path from "path";
import helmet from "helmet";

// 3rd party lib modules
import cookieParser from "cookie-parser";
import logger from "morgan";

// MySQL Sequelize
import DB from "../models/index.js";

// import router modules
import indexRouter from "../routes/index.js";
import usersRouter from "../routes/users.js";

// create express framework
const app = express();

// helmet security module
app.use(helmet());

/**
 * img-src 정책
 * URL.createObjectURL() 함수를 사용하여
 * 가상으로 생성된 이미지를 img tag 의 src(소스)로
 * 사용할 수 있도록 정책 설정하기
 */
const cspDirective = {
  directives: {
    // 우리 서버에 있는것만 쓸거야
    defaultSrc: ["'self'"],
    "img-src": ["'self'", "blob:", "data:"],
    // imgSrc: ["'self'", "blob:", "data:"], / blob 암호화처리
    // 그 이름을 src로 쓸수있게
    // inline으로 허가하고 fontawesome 에 있는 스크립트, 스타일 허가
    "script-src": ["'self'", "'unsafe-inline'", "https://fontawesome.com/"],
    "script-src": ["'self'", "'unsafe-inline'", "https://fontawesome.com/v4/icons/"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fontawesome.com/"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fontawesome.com/v4/icons/"],
  },
};
// 헬멧아 이 정책은 풀어줘
// helmet 을 통해 막혀있는 정책중 csp 정책을 일부 완화하기
app.use(helmet.contentSecurityPolicy(cspDirective));

// https://fontawesome.com/
// https://fontawesome.com/v4/icons/
// MySQL DB 연결
// 주의!!! force 를 true 로 하면 기존의 Table 을 모두 DROP 한 후 재생성 한다
DB.sequelize.sync({ force: false }).then((dbConn) => {
  console.log(dbConn.options.host, dbConn.config.database, "DB Connection OK");
});

// Disable the fingerprinting of this web technology.
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "pug");

// middleWare enable
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("public")));

// router link enable, link connection
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
