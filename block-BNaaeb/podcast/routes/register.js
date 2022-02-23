var express = require("express");
var router = express.Router();
var Register = require("../models/Register");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("register.ejs");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  Register.create(req.body, (err, data) => {
    if (err) return next(err);
    res.redirect("/register/login");
  });
});

router.get("/login", (req, res, next) => {
  var error = req.flash("error")[0];
  res.render("login", { error });
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "Email/Password required!");
    return res.redirect("/register/login");
  }
  Register.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error", "Email is not registered");
      return res.redirect("/register/login");
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash("error", "Invalid password!");
        return res.redirect("/register/login");
      }

      req.session.userId = user.id;
      if (user.type === "admin") {
        res.redirect("/admin");
      } else {
        res.redirect("/");
      }
    });
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
});

module.exports = router;
