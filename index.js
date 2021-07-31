//This is the express.js initialization

var express = require("express");
var app = express();

var things = require("./things.js");

//This is MIDDLEWARE
//First middleware befire response is sent
app.use(function (req, res, next) {
  console.log("START");
  next();
});

//both index.js and things.js should be in same directory
//Route handler that sends the response
app.use("/things", things);



app.listen(3000);
