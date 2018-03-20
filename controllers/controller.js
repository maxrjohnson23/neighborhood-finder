var express = require("express");

var router = express.Router();
var db = require("../models");

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

router.post("/api/surveys", function (req, res) {

    db.Surveys.create({
        geocodeLat: req.body.geocodeLat,
        geocodeLng: req.body.geocodeLng,
        Street: req.body.address,
        City: req.body.city,
        State: req.body.state,
        Zip: req.body.zip,
        Age: req.body.age,
        Industry: req.body.career,
        Income: req.body.income,
        Education: req.body.education,
        Children: req.body.kids,
        Pets: req.body.pets,
        Relationship_Status: req.body.married,
        Car: req.body.car,
        Social: req.body.social,
    }).then(function (data) {
        res.json({id: data.insertId});
        // res.redirect("/");
    }).catch(function (err) {
        res.json(err);
    });

    db.Hobbies.create({
        Hobbies: req.body.hobbies
  }).then(function (data) {
      res.json({id: data.insertId});
      // res.redirect("/");
  }).catch(function (err) {
      res.json(err);
  });
});

router.get("/api/surveys", (req, res) => {
    console.log('Returning surveys');
    db.Surveys.findAll({
        attributes: ['Address', 'City', 'State', 'Zip', 'geocodeLat', 'geocodeLng'],
        raw: true
    }).then(result => {

        console.log('Address' + result[0].Address + result[0].City);

        res.json(result);
    }).catch((err) => {
        res.status(500).send({error: err});
    });
});
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
