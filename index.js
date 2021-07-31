//This is the express.js initialization
var express = require("express");
var app = express();

//This is pug
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/first_template", function (req, res) {
  res.render("first_view");
});

app.get("/dynamic_view", function (req, res) {
  res.render("dynamic", {
    user: {
      name: "Ayush",
      age: "20",
    },
  });
});

//For routing, check things.js
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
