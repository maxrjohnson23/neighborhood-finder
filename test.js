// const groupArray = require('group-array');
// let result = [
//     {
//         "neighborhood": "Lincoln Park",
//         "question": "education",
//         "answer": "HIGH SCHOOL OR GDE",
//         "Count": 2
//     },
//     {
//         "neighborhood": "Near North Side",
//         "question": "education",
//         "answer": "HIGH SCHOOL OR GDE",
//         "Count": 1
//     },
//     {
//         "neighborhood": "Lincoln Park",
//         "question": "car",
//         "answer": "YES",
//         "Count": 2
//     },
//     {
//         "neighborhood": "Near North Side",
//         "question": "car",
//         "answer": "YES",
//         "Count": 1
//     },
//     {
//         "neighborhood": "Lincoln Park",
//         "question": "income",
//         "answer": "1 to 30K",
//         "Count": 2
//     },
//     {
//         "neighborhood": "Near North Side",
//         "question": "income",
//         "answer": "1 to 30K",
//         "Count": 1
//     },
//     {
//         "neighborhood": "Lincoln Park",
//         "question": "age",
//         "answer": "25 to 30",
//         "Count": 2
//     },
//     {
//         "neighborhood": "Near North Side",
//         "question": "age",
//         "answer": "25 to 30",
//         "Count": 1
//     },
//     {
//         "neighborhood": "Lincoln Park",
//         "question": "industry",
//         "answer": "AUTO",
//         "Count": 2
//     },
//     {
//         "neighborhood": "Near North Side",
//         "question": "industry",
//         "answer": "INFORMATION TECH",
//         "Count": 1
//     },
//     {
//         "neighborhood": "Lincoln Park",
//         "question": "children",
//         "answer": null,
//         "Count": 0
//     },
//     {
//         "neighborhood": "Near North Side",
//         "question": "children",
//         "answer": null,
//         "Count": 0
//     },
//     {
//         "neighborhood": "Lincoln Park",
//         "question": "pets",
//         "answer": "YES",
//         "Count": 2
//     },
//     {
//         "neighborhood": "Near North Side",
//         "question": "pets",
//         "answer": "YES",
//         "Count": 1
//     },
//     {
//         "neighborhood": "Lincoln Park",
//         "question": "relationship_status",
//         "answer": "MARRIED",
//         "Count": 2
//     },
//     {
//         "neighborhood": "Near North Side",
//         "question": "relationship_status",
//         "answer": "MARRIED",
//         "Count": 1
//     }
// ]

// function group () {
//     // groupArray(result, 'neighborhood', 'question')
//     let grouped = (groupArray(result, 'neighborhood', 'question'));
//     let groupedKey = Object.keys(groupArray(result, 'neighborhood', 'question'));
    
//     // console.log(`grouped = ${grouped}`);
//     console.log(`groupedKey = ${groupedKey}`);
//     let entries = Object.entries(grouped);
//     console.log(`entries = ${entries}`);
//     let entryVal = entries.forEach(x => {
//         console.log(`entry val = ${x}`)
//     })
    
    
//     let groupedOne = groupedKey.forEach(x => {
//         // console.log();
//         let answer = Object.values(x);
//         console.log(`neighborhood name = ${x}`);
//         console.log(`answer = ${answer}`);
//     })
// }

// group();
let surveys = {
    "Lake View East": {
        "education": [
            {
                "neighborhood": "Lake View East",
                "question": "education",
                "answer": "PHD",
                "Count": 1
            }
        ],
        "car": [
            {
                "neighborhood": "Lake View East",
                "question": "car",
                "answer": "NO",
                "Count": 1
            }
        ],
        "income": [
            {
                "neighborhood": "Lake View East",
                "question": "income",
                "answer": "500K+",
                "Count": 1
            }
        ],
        "age": [
            {
                "neighborhood": "Lake View East",
                "question": "age",
                "answer": "25 to 30",
                "Count": 1
            }
        ],
        "industry": [
            {
                "neighborhood": "Lake View East",
                "question": "industry",
                "answer": "FINANCE",
                "Count": 1
            }
        ],
        "children": [
            {
                "neighborhood": "Lake View East",
                "question": "children",
                "answer": "NO",
                "Count": 1
            }
        ],
        "pets": [
            {
                "neighborhood": "Lake View East",
                "question": "pets",
                "answer": "NO",
                "Count": 1
            }
        ],
        "relationship_status": [
            {
                "neighborhood": "Lake View East",
                "question": "relationship_status",
                "answer": "SINGLE",
                "Count": 1
            }
        ]
    },
    "Lincoln Park": {
        "education": [
            {
                "neighborhood": "Lincoln Park",
                "question": "education",
                "answer": "HIGH SCHOOL OR GDE",
                "Count": 1
            }
        ],
        "car": [
            {
                "neighborhood": "Lincoln Park",
                "question": "car",
                "answer": "NO",
                "Count": 1
            }
        ],
        "income": [
            {
                "neighborhood": "Lincoln Park",
                "question": "income",
                "answer": "1 to 30K",
                "Count": 1
            }
        ],
        "age": [
            {
                "neighborhood": "Lincoln Park",
                "question": "age",
                "answer": "25 to 30",
                "Count": 1
            }
        ],
        "industry": [
            {
                "neighborhood": "Lincoln Park",
                "question": "industry",
                "answer": "FINANCE",
                "Count": 1
            }
        ],
        "children": [
            {
                "neighborhood": "Lincoln Park",
                "question": "children",
                "answer": "NO",
                "Count": 1
            }
        ],
        "pets": [
            {
                "neighborhood": "Lincoln Park",
                "question": "pets",
                "answer": "NO",
                "Count": 1
            }
        ],
        "relationship_status": [
            {
                "neighborhood": "Lincoln Park",
                "question": "relationship_status",
                "answer": "SINGLE",
                "Count": 1
            }
        ]
    },
    "Near North Side": {
        "education": [
            {
                "neighborhood": "Near North Side",
                "question": "education",
                "answer": "BACHELOR'S DEGREE",
                "Count": 1
            }
        ],
        "car": [
            {
                "neighborhood": "Near North Side",
                "question": "car",
                "answer": "YES",
                "Count": 1
            }
        ],
        "income": [
            {
                "neighborhood": "Near North Side",
                "question": "income",
                "answer": "50K to 70K",
                "Count": 1
            }
        ],
        "age": [
            {
                "neighborhood": "Near North Side",
                "question": "age",
                "answer": "25 to 30",
                "Count": 1
            }
        ],
        "industry": [
            {
                "neighborhood": "Near North Side",
                "question": "industry",
                "answer": "FINANCE",
                "Count": 1
            }
        ],
        "children": [
            {
                "neighborhood": "Near North Side",
                "question": "children",
                "answer": "NO",
                "Count": 1
            }
        ],
        "pets": [
            {
                "neighborhood": "Near North Side",
                "question": "pets",
                "answer": "NO",
                "Count": 1
            }
        ],
        "relationship_status": [
            {
                "neighborhood": "Near North Side",
                "question": "relationship_status",
                "answer": "MARRIED",
                "Count": 1
            }
        ]
    }
}

function createneighborhoodDiv(neighborhood, key){//create character skeleton, fill with players
    var neighborhoodDiv = $("<div class='neighborhood' data-name='"+ key+"'>");
    var neighborhoodName = $("<div class= 'neighborhood-name'>").text(surveys.education.neighborhood);
    // var playerImage = $("<img alt='player image' class='player-image'>").attr("src", players.imageUrl);
    // var neighborhood = $("<div class= 'player-hp'>").text(`HP ${players.hp}`);
    neighborhoodDiv.append(neighborhoodName);
    // playerDiv.append(playerImage);
    // playerDiv.append(playerHP);
    return neighborhoodDiv;
}

function renderNeighborhoods(){
    let keys = Object.keys(surveys); //filter neighborhood array to select key
    for(var i = 0; i< keys.length; i++){// cycle through player-data
        var nKey = keys[i];
        var neighborhood = neighborhood[nKey]; //create var that holds all player data
        var neighborhoodDiv = createNeighborhoodDiv(neighborhood, nKey);//store in div
        $('#neighborhood-area').append(neighborhoodDiv); //fill div
    }
}