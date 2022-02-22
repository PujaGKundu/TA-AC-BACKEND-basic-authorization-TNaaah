var createError = require("http-errors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo");
var flash = require("connect-flash");
var multer = require("multer");
var auth = require("./middlewares/auth");

require("dotenv").config();

var indexRouter = require("./routes/index");
//var adminRouter = require("./routes/admin");
var userRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var registerRouter = require("./routes/register");

mongoose.connect("mongodb://localhost/e-commerce", (err) => {
  console.log(err ? err : "Connected to Database");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//add session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/e-commerce" }),
  })
);

app.use(flash());

app.use(auth.registerInfo);

app.use("/", indexRouter);
//app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;