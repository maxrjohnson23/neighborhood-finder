const groupArray = require('group-array');
let result = [
    {
        "neighborhood": "Lincoln Park",
        "question": "education",
        "answer": "HIGH SCHOOL OR GDE",
        "Count": 2
    },
    {
        "neighborhood": "Near North Side",
        "question": "education",
        "answer": "HIGH SCHOOL OR GDE",
        "Count": 1
    },
    {
        "neighborhood": "Lincoln Park",
        "question": "car",
        "answer": "YES",
        "Count": 2
    },
    {
        "neighborhood": "Near North Side",
        "question": "car",
        "answer": "YES",
        "Count": 1
    },
    {
        "neighborhood": "Lincoln Park",
        "question": "income",
        "answer": "1 to 30K",
        "Count": 2
    },
    {
        "neighborhood": "Near North Side",
        "question": "income",
        "answer": "1 to 30K",
        "Count": 1
    },
    {
        "neighborhood": "Lincoln Park",
        "question": "age",
        "answer": "25 to 30",
        "Count": 2
    },
    {
        "neighborhood": "Near North Side",
        "question": "age",
        "answer": "25 to 30",
        "Count": 1
    },
    {
        "neighborhood": "Lincoln Park",
        "question": "industry",
        "answer": "AUTO",
        "Count": 2
    },
    {
        "neighborhood": "Near North Side",
        "question": "industry",
        "answer": "INFORMATION TECH",
        "Count": 1
    },
    {
        "neighborhood": "Lincoln Park",
        "question": "children",
        "answer": null,
        "Count": 0
    },
    {
        "neighborhood": "Near North Side",
        "question": "children",
        "answer": null,
        "Count": 0
    },
    {
        "neighborhood": "Lincoln Park",
        "question": "pets",
        "answer": "YES",
        "Count": 2
    },
    {
        "neighborhood": "Near North Side",
        "question": "pets",
        "answer": "YES",
        "Count": 1
    },
    {
        "neighborhood": "Lincoln Park",
        "question": "relationship_status",
        "answer": "MARRIED",
        "Count": 2
    },
    {
        "neighborhood": "Near North Side",
        "question": "relationship_status",
        "answer": "MARRIED",
        "Count": 1
    }
]

function group () {
    // groupArray(result, 'neighborhood', 'question')
    let grouped = (groupArray(result, 'neighborhood', 'question'));
    let groupedKey = Object.keys(groupArray(result, 'neighborhood', 'question'));
    
    // console.log(`grouped = ${grouped}`);
    console.log(`groupedKey = ${groupedKey}`);
    let entries = Object.entries(grouped);
    console.log(`entries = ${entries}`);
    let entryVal = entries.forEach(x => {
        console.log(`entry val = ${x}`)
    })
    
    
    let groupedOne = groupedKey.forEach(x => {
        // console.log();
        let answer = Object.values(x);
        console.log(`neighborhood name = ${x}`);
        console.log(`answer = ${answer}`);
    })
}

group();
