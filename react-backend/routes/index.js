var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/predict", function(req, res, next) {
  var question = req.query.ques;
  var apikey = req.query.key;

  var resPredict = { question: question };

  const get_data = async scrapyUrl => {
    try {
      const response = await fetch(scrapyUrl);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const get_text = async predictionUrl => {
    try {
      const response = await fetch(predictionUrl);
      const text = await response.text();
      return text;
    } catch (error) {
      console.log(error);
    }
  };

  const return_prediction = async () => {
    const scrapyUrl =
      "https://storage.scrapinghub.com/items/432444/1/1?format=json&apikey=" +
      apikey;
    const predictionUrl = "https://flaskbasic.azurewebsites.net/";

    resPredict.scrapedData = await get_data(scrapyUrl);
    resPredict.predictedAnswer = await get_text(predictionUrl);
    res.json(resPredict);
  };

  return_prediction();
});

module.exports = router;
