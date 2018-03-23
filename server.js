var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var routes = require("./controllers/controller.js");
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());


app.use(routes);

db.sequelize.sync().then(function () {
  app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
});