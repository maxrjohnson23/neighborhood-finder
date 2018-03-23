const authController = require("../controllers/authcontroller.js");
const express = require("express");
const app = express();
const passport = require("passport");
const strategy = require('../config/passport/passport')
// var app = express();

module.exports = function(app) {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.get("/logout", authController.logout);
  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/",
    //   failureFlash: true
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
