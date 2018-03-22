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
            Address: req.body.address,
            Neighborhood: req.body.neighborhood,
            geocodeLat: req.body.geocodeLat,
            geocodeLng: req.body.geocodeLng,
        }
    ).then(function (data) {
        data.setHobbies(req.body.hobbies);
        data.setSocials(req.body.social);
        res.json({id: data.insertId});
        // res.redirect("/");
    }).catch(function (err) {
        res.json(err);
    });

});

router.get("/api/surveys", (req, res) => {
    console.log('Returning surveys');
    db.Surveys.findAll({
        attributes: ['Id', 'Street', 'City', 'State', 'Zip', 'geocodeLat', 'geocodeLng'],
        raw: false,
        include: [{
            model: db.Hobbies,
            attributes: ['id'],
            through: { attributes: ['id'] }
        },{
            model: db.Social,
            attributes: ['id'],
            through: { attributes: ['id'] }
        }]
    }).then(result => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error: err});
    });
});



// Export routes for server.js to use.
module.exports = router;
