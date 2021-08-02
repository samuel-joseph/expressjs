//This is the express.js initialization
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var app = express();

//cookie parser
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

//This is body-parser multer
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

app.get("/", function (req, res) {
  res.cookie("name", "express").send("cookie set");
  console.log(document.cookie);
  res.render("form");

  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page first time!");
  }
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

app.post("/", function (req, res) {
  console.log(req.body);
  res.send("recieved your request!");
});

//This enables express to use static files
//This is a built-in middleware
app.use(express.static("public"));

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

app.get("/static_file_test", function (req, res) {
  res.render("static_file_test");
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

var Users = [];

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.post("/signup", function (req, res) {
  if (!req.body.id || !req.body.password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    Users.filter(function (user) {
      if (user.id === req.body.id) {
        res.render("signup", {
          message: "User Already Exists! Login or choose another user id",
        });
      }
    });
    var newUser = { id: req.body.id, password: req.body.password };
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect("/protected_page");
  }
});

app.listen(3000);
