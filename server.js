// const connection = require("./config/connection");
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Add Routes
app.use(express.static(__dirname + '/public'));
// app.use('/', require('./controllers/burgerController'));


// Connect to the database and start express server
// connection.connect(err => {
//     if (err) {
//         console.log(err);
//     } else {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
//     }
// });