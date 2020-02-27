var express = require("express");
var router = express.Router();

/* GET config settings */
router.get("/", function(req, res, next) {
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([
    {
      id: 1,
      username: "samsepi0l"
    },
    {
      id: 2,
      username: "D0loresH4ze"
    }
  ]);
});

router.post("/scrape", function(req, res, next) {
  res.send({ projectID: 12345 });
});

module.exports = router;
