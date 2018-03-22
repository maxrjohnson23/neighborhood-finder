var express = require("express");
var bodyParser = require("body-parser");

var exphbs = require("express-handlebars");
var app = express();

var passport = require('passport');
var session = require('express-session');
var routes = require("./controllers/controller.js");
var authRoutes = require('./controllers/authController');
var authRed = require('./authRoutes/auth')(app);
var db = require("./models");
// var pass = require('./config/passport/passport')(app);

var PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

//load passport strategies
require('./config/passport/passport')(passport, db.user);

//For Handlebars
app.set('views', './public')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(routes);

db.sequelize.sync().then(function () {
  app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
});