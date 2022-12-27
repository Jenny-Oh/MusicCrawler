const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
//const PORT = 4000;
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
const { type } = require("@testing-library/user-event/dist/type");
const { Router } = require("express");
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://doragee810:<password>@hellomongo.vws50y5.mongodb.net/?retryWrites=true&w=majority"
);

var db = mongoose.connection;

db.on("error", function () {
  console.log("Connection Failed!");
});

db.once("open", function () {
  console.log("Connected!");
});

var Charts = mongoose.Schema({
  id: "number",
  title: "string",
  singer: "string",
  album: "string",
});

var Chart = mongoose.model("Schema", Charts);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const url = {
  실시간차트: "https://www.melon.com/chart/index.htm",
  주간차트: "https://www.melon.com/chart/week/index.htm",
  일간차트: "https://www.melon.com/chart/day/index.htm",
};

const getHtml = async (chartType) => {
  try {
    return await axios.get(url[chartType]);
    // 해당 사이트 html 태그 가져오기
  } catch (error) {
    console.error(error);
  }
};

app.post("/search/:key1/:key2/:key3", (req, res) => {
  console.log(req.params.key1);
  console.log(req.params.key2);
  console.log(req.params.key3);
  var chartType = req.params.key1;
  getHtml(chartType)
    .then((html) => {
      const $ = cheerio.load(html.data);
      let parentTag = $("div.service_list_song > table > tbody > tr");
      //console.log(parentTag.text().replace(/[\t\n]/g,""))
      // 크롤링할 태그 찾기

      Chart.deleteMany({}).then(() => {
        console.log("DB initialized!");
      });
      let resultArr = [];
      parentTag.each(function (i, elem) {
        let title = $(elem)
          .find("div.rank01")
          .text()
          .replace(/[\t\n]/g, "");
        let singer = $(elem)
          .find("div.rank02")
          .text()
          .replace(/[\t\n]/g, "");
        singer = singer.slice(0, singer.length / 2);
        //console.log(title,singer);
        //.substring(0,length(singer)/2)
        //console.log(type(singer))
        let itemObj = {
          id: i + 1,
          title: title,
          singer: singer,
          //num: $(this).find("lst100").text(),
        };
        var item = new Chart({ id: i + 1, title: title, singer: singer });
        // 저장하기
        item.save(function (error, data) {
          if (error) {
            console.log(error);
          } else {
            console.log("Saved!");
            resultArr.push(itemObj);
            //console.log(itemObj);
          }
        });

        console.log(resultArr);
      });

      return resultArr;
    })
    .then((data) => res.send(data));
});

// // simple route
// app.get("/", (req, res) => {
//   res.json({ test: "success!" });
// });

// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});

//var test = new Chart({rank:'0', title: 'test', singer: 'test', album: 'test'});

// All API : 저장된 모든 결과를 출력
app.post("/all/:key1/:key2", async (req, res) => {
  //console.log(req.params.key1);
  var type = req.params.key1;
  var context = req.params.key2;
  var query = { title: { $regex: context } };
  var resultArr = [];
  if (type == "가수이름") {
    query = { singer: { $regex: ".*" + context + ".*" } };
    console.log(context);
    resultArr = await Chart.find({
      singer: { $regex: ".*" + context + ".*", $options: "i" },
    }).sort({
      $natural: -1,
    });
    //console.log(Arr);
    return res.json({
      msg: "success",
      resultArr,
    });
  }
  //console.log("keyName = " + keyName);

  //console.log(query);
  else {
    resultArr = await Chart.find({
      title: { $regex: ".*" + context + ".*", $options: "i" },
    }).sort({
      $natural: -1,
    });
    console.log(context);
    console.log(resultArr);
    return res.json({
      msg: "success",
      resultArr,
    });
  }
  //.limit(100);
});

app.get("/result", async (req, res) => {
  const resultArr = await Chart.find({}).sort({ $natural: -1 }).limit(100);
  console.log(resultArr.length);
  return res.json({
    msg: "success",
    resultArr,
  });
});
