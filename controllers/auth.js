const authController = require('./authController');
const express = require("express");
const app = express();
// var passport = require('passport');
// const router = express.Router();
var db = require("../models");

module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);

 
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/',
    
      failureRedirect: '/signup'
    }
    
    ));
}


app.get('/signin', authController.signin);