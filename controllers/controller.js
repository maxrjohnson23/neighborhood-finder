var express = require("express");
var groupArray = require('group-array');

var router = express.Router();
var db = require("../models");

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
        console.log(data);
        data.setHobbies(req.body.hobbies).then(() => {

            data.setSocials(req.body.social).then(() => {
                db.Surveys.findOne({where :{id: data.id}, raw: false, include: [{
                        model: db.Hobbies,
                        attributes: ['id'],
                        through: { attributes: ['id'] }
                    },{
                        model: db.Social,
                        attributes: ['id'],
                        through: { attributes: ['id'] }
                    }]}).then((data) => {
                    console.log(data);
                    res.json(data);

                })
            })
        });

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

// Query the surveys table and aggregate survey results based on
// neighborhood, question, answer, count of answer

Router.get("/api/neighborhoods", (req, res) => {
    console.log('Returning neighborhoods');
    db.Surveys.sequelize.query(
                `Select neighborhood,"education" as question,education as answer,Count(Education) as Count
                from
                (
                select neighborhood, education
                from surveys
                )
                as a
                group by neighborhood,question, answer

                union

                Select neighborhood,"car" as question, car as criteria,Count(car) as Count
                from
                (
                select neighborhood, car
                from surveys
                )
                as b
                group by neighborhood,question, criteria

                union

                Select neighborhood,"income" as question, income as criteria,Count(income) as Count
                from
                (
                select neighborhood, income
                from surveys
                )
                as c
                group by neighborhood,question, criteria
                
				union

                Select neighborhood,"age" as question, age as criteria,Count(age) as Count
                from
                (
                select neighborhood, age
                from surveys
                )
                as d
                group by neighborhood,question, criteria
                
				union

                Select neighborhood,"industry" as question, industry as criteria,Count(industry) as Count
                from
                (
                select neighborhood, industry
                from surveys
                )
                as d
                group by neighborhood,question, criteria

				union

                Select neighborhood,"children" as question, children as criteria,Count(children) as Count
                from
                (
                select neighborhood, children
                from surveys
                )
                as d
                group by neighborhood,question, criteria
                
				union

                Select neighborhood,"pets" as question, pets as criteria,Count(pets) as Count
                from
                (
                select neighborhood, pets
                from surveys
                )
                as d
                group by neighborhood,question, criteria
                
				union

                Select neighborhood,"relationship_status" as question, relationship_status as criteria,Count(relationship_status) as Count
                from
                (
                select neighborhood, relationship_status
                from surveys
                )
                as d
                group by neighborhood,question, criteria;`
                ,
                { type: db.Surveys.sequelize.QueryTypes.SELECT }
    ).then(result => {
    // Note the use of npm group-array package (required at top)
    res.json(groupArray(result, 'neighborhood', 'question'));
    console.log(groupArray(result, 'neighborhood', 'question'));
    var neighborhoodArray = groupArray(result, 'neighborhood', 'question');
    }).catch((err) => {
        res.status(500).send({error: err});
    });
});



// Export routes for server.js to use.
module.exports = router;
