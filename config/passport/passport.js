const bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;

  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, email, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            var userPassword = generateHash(password);

            var data = {
              email: email,

              password: userPassword,

              firstname: req.body.firstname,

              lastname: req.body.lastname
            };

            User.create(data).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {

        usernameField: "email",

        passwordField: "password",

        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, email, password, done) {
        var User = user;

        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};
// var express = require("express");
// // var bodyParser = require("body-parser");

// // var exphbs = require("express-handlebars");
// var app = express();
// var passport = require('passport');
// var local = require('passport-local').Strategy;
// app.use(require('cookie-parser')())
// app.use(require('body-parser').urlencoded({ extended: true }))
// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

// passport.use(new Strategy(function(username, pass, cb){
//   var hashedPass = bcrypt.hashSync(pass)
//   User.findOne({
//     where: {
//       username: username
//     }
//   }).then(function(user, err){
//     if (err) { return cb(err); }
//     if (!user) { 
//     return cb(null, false); }
//     if (!bcrypt.compareSync(pass, user.password)){ 
//       return cb(null, false); }
//     return cb(null, user);
//   })
// }))

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   User.findById(id).then(function (user) {
//     cb(null, user);
//   });
// });

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(function(req,res,next){
//   if(req.user){
//     res.locals.user = req.user.username
//   }
//   next()
// })
