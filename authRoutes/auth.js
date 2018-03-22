const authController = require("../controllers/authcontroller.js");
const express = require("express");
const app = express();
const passport = require("passport");
const strategy = require('../config/passport/passport')

var User = require("../models/user")
// var app = express();

module.exports = function(app) {
  // app.get("/signup", authController.signup);
  app.get("/signup", function(req, res){
    res.render("signup")
  })
  app.get("/signin", authController.signin);
  app.get("/logout", authController.logout);
  app.get("/dashboard", isLoggedIn, authController.dashboard);

  // app.post(
  //   "/signup",
  //   passport.authenticate("local-signup", {
  //     successRedirect: "/dashboard",

  //     failureRedirect: "/",
  //   //   failureFlash: true
  //   })
  // );

  app.post("/signup", function(req, res, next){
    console.log(req);
    User.findOne({
      where: {
       email: req.body.email
      }
    }).then(function(user){
      if(!user){
        User.create({
          username: req.body.username,
    password: bcrypt.hashSync(req.body.password)
        }).then(function(user){
          passport.authenticate("local", {failureRedirect:"/signup", successRedirect: "/posts"})(req, res, next)
        })
      } else {
        res.send("user exists")
      }
    })
  })

  // app.post(
  //   "/signin",
  //   passport.authenticate("local-signin", {
  //     successRedirect: "/dashboard",

  //     failureRedirect: "/signin"
  //   })
  // );
  app.post("/signin", passport.authenticate('local', { 
    failureRedirect: '/signin',
    successRedirect: '/posts'
  }))

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
