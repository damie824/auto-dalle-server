//모듈 설정
const express = require("express");
const OpenAI = require("openai").OpenAI;

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const router = express.Router();

//images 라우트 관리
router.post("/images", async (req, res) => {
  try {
    console.log("catched");
    console.log(req.body);

    const getGpt = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Imagine the detail apperance of the input. arount 20 words",
        },
        {
          role: "user",
          content: req.body.prompt,
        },
      ],
    });

    const getImg = await openai.images.generate({
      prompt: getGpt.choices[0].message.content,
      size: "1024x1024",
    });

    res.status(200).json({
      message: getGpt.choices[0].message.content,
      url: getImg.data[0].url,
    });
  } catch (e) {
    console.warn(e.message);
    res.status(500).send("오류가 발생하였습니다.");
  }
});

router.post("/test", (req, res) => {
  console.log("catched");
  console.log(req.body);
  res.status(200).send("굳");
});

module.exports = router;
