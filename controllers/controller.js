var express = require("express");
// var passport = require('passport');

var router = express.Router();
var db = require("../models");

const authController = require('./authController');

// Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   db.Burger.findAll({
//     attributes: ["id","burger_name","devoured","createdAt","updatedAt"],
//     raw: true
//   }).then(function(data) {
//     var hbsObject = {
//       burgers: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

router.post("/api/surveys", function(req, res) {
  db.Surveys.create({
    Street:req.body.address,
    City: req.body.city,
    State: req.body.state,
    Zip: req.body.zip,
    Age: req.body.age,
    Hobbies: req.body.hobbies,
    Industry: req.body.career,
    Income: req.body.income,
    Education: req.body.education,
    Children: req.body.kids,
    Pets: req.body.pets,
    Relationship_Status: req.body.married,
    Car: req.body.car,
    Social: req.body.social,
    Lifestyle: req.body.lifestyle,
    Address: req.body.address,
    geocodeLat: req.body.geocodeLat,
    geocodeLng: req.body.geocodeLng
  }).then(function(data) {
    res.json({ id: data.insertId });
    // res.redirect("/");
  });
});

router.post('api/user', (req, res) => {
  db.Users.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }).then(data => {
    res.json({ id: data.insertId });
    res.redirect('')
  });
});

//signup




 
// module.exports = function(router, passport) {
 
//     router.get('/signup', authController.signup);
//     router.get('/signin', authController.signin);

 
//     router.post('/signup', passport.authenticate('local-signup', {
//       successRedirect: '/',
    
//       failureRedirect: '/signup'
//     }
    
//     ));
// }


// router.get('/signin', authController.signin);

// router.post('/signup', passport)
// router.put("/api/burgers/:id", function(req, res) {
//   db.Burger.update({devoured:req.body.devoured},
//   {
//     where: {
//       id: req.params.id
//     }
//   }).then(function(data) {
//     console.log(data);
//     res.json("/");
//   });
// });

// Export routes for server.js to use.
module.exports = router;
