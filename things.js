//This is Express.router

var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("MIDDLE");
  next();
});

router.use("/", function (req, res) {
  console.log("END");
});

router.post("/", function (req, res) {
  res.send("POST route on thigns");
});

//DYNAMIC routes
router.get("/:id", function (req, res) {
  res.send("The id you specified is " + req.params.id);
});

router.get("/:id/:name", function (req, res) {
  res.send("id: " + req.params.id + " name:" + req.params.name);
});

router.get("*", function (req, res) {
  res.send("Sorry, this is an invalid URL.");
});

//export this router to use in our index.js
module.exports = router;
