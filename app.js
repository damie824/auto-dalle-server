//환경 변수 설정
require("dotenv").config();

//필요 모듈 불러오기
const express = require("express");
const cors = require("cors");

//라우터 불러오기
const GenerateRoute = require("./routes/generate");

//포트 설정
const port = process.env.PORT;

//익스프레스 모듈 선언
const app = express();

//익스프레스 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors 설정
app.use(cors({ origin: true }));

//라우터 연결
app.use("/generate", GenerateRoute);

//서버 시작
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
