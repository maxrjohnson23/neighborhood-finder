const db = require("../models");
// Get seed lat/lng data from JSON
const data = require("../src/js/maps/data/data.json");

// Add randomElement method to Array prototype
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};

let ages = ["18 to 22", "22 to 25", "25 to 30", "30 to 40", "40 to 50", "50 to 70", "70+"];
let maritalStatuses = ["MARRIED", "SINGLE"];
let yesNo = ["YES", "NO"];
let industry = ["AUTO", "BIOTECH", "BUSINESS SERVICES", "ENERGY", "FINANCE", "INFORMATION TECH", "ENTERTAINMENT", "HEALTH SERVICES", "MANUFACTURING", "NON-PROFIT", "OTHER"];
let incomeRange = ["1 to 30K", "30K to 50K", "50K to 70K", "70K to 100K", "100K to 250K", "250K to 500K", "500K+", "N/A"];
let education = ["HIGH SCHOOL OR GDE", "ASSOCIATES DEGREE", "BACHELOR'S DEGREE", "MASTER'S DEGREE", "PHD", "N/A"];

db.sequelize.sync().then(function () {

    // Populate hobby list
    let hobbyList = ["Sports", "Music", "Reading", "Health", "Games", "Creative Expression/Arts", "Cooking", "Movies", "Traveling", "Card", "Volunteer"]
    hobbyList.forEach(hobby => {
        db.Hobbies.create({
            name: hobby
        });
    });


    // Populate social list
    let socialList = ["Dating", "Late Night Bars", "Attending Sporting Events", "Theatre", "Live Music", "Stay at Home", "Fitness Events", "Volunteer Events", "Outdoor Activites", "Art Shows"];

    socialList.forEach(social => {
        db.Social.create({
            name: social
        });
    });

    data.forEach(a => {
        // Generate semi-random values
        let address = (Math.floor(Math.random() * 10000) + 1) + " Main Street";
        let age = ages.randomElement();
        let marital = maritalStatuses.randomElement();
        let kids = yesNo.randomElement();
        let pets = yesNo.randomElement();
        let car = yesNo.randomElement();
        let career = industry.randomElement();
        let income = incomeRange.randomElement();
        let edu = education.randomElement();

        // Get random number of random hobbies
        let numHobbies = Math.floor(Math.random() * hobbyList.length);
        let hobbies = new Set();
        for (let i = 0; i < numHobbies; i++) {
            // Hobby ID starts at 1
            hobbies.add(hobbyList.indexOf(hobbyList.randomElement()) + 1);
        }

        // Get random number of random social activities
        let numSocial = Math.floor(Math.random() * socialList.length);
        let social = new Set();
        for (let i = 0; i < numSocial; i++) {
            // Social ID starts at 1
            social.add(socialList.indexOf(socialList.randomElement()) + 1);
        }

        // Create DB entry for survey
        db.Surveys.create({
            geocodeLat: a.lat,
            geocodeLng: a.lng,
            Neighborhood: a.neighborhood,
            Address: address,
            Street: address + " Main Street",
            City: "Chicago",
            State: "IL",
            Zip: "60606",
            Age: age,
            Industry: career,
            Income: income,
            Education: edu,
            Children: kids,
            Pets: pets,
            Relationship_Status: marital,
            Car: car,
        }).then(function (data) {
            data.setHobbies(Array.from(hobbies));
            data.setSocials(Array.from(social));
        }).catch(function (err) {
            console.log(err);
        });
    });


});