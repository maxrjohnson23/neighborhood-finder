$(document).ready(function () {
    setTimeout(function () {
        $('body').addClass('loaded');
    },3000);

    $(window).on("load", function () {
        preloaderFadeOutTime = 300;

        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            preloader.fadeOut(preloaderFadeOutTime);
        }

        hidePreloader();

    });

    function extractFromAddress(components, type) {
        for (let i = 0; i < components.length; i++) {
            for (let j = 0; j < components[i].types.length; j++) {
                if (components[i].types[j] == type) {
                    return components[i].long_name;
                }
            }
        }
        return "";
    }

    $("#submitSurvey").on("click", function (submit) {
        submit.preventDefault();

        var addressInput = $("#street").val() + ', ' + $("#city").val() + ', ' + $("#state").val() + ' ' + $("#zip").val();

        var geocoder = new google.maps.Geocoder();

        var resultLat = null;
        var resultLng = null;

        geocoder.geocode({address: addressInput}, function (results, status) {

            if (status === google.maps.GeocoderStatus.OK) {

                resultLat = results[0].geometry.location.lat();
                resultLng = results[0].geometry.location.lng();

                console.log(`${resultLat},${resultLng}`);

                // Get hobby ID from checkboxes
                let hobbies = $.map($('input.hobby:checkbox:checked'), function (e) {
                    return $(e).data("hob");
                });

                // Get social ID from checkboxes
                let social = $.map($('input.social:checkbox:checked'), function (e) {
                    return $(e).data("social");
                });


                var newSurvey = {
                    street: $("#street").val(),
                    city: $("#city").val(),
                    state: $("#state").val(),
                    zip: $("#zip").val(),
                    age: $("#age").val(),
                    industry: $("#industry").val(),
                    income: $("#income").val(),
                    hobbies: hobbies,
                    social: social,
                    education: $("#education").val(),
                    children: $("#children").val(),
                    pets: $("#pets").val(),
                    married: $("#married").val(),
                    car: $("#car").val(),
                    address: $("#street").val() + ', ' + $("#city").val() + ', ' + $("#state").val() + ' ' + $("#zip").val(),
                    neighborhood: extractFromAddress(results[0].address_components, "neighborhood"),
                    geocodeLat: resultLat,
                    geocodeLng: resultLng
                };

                $.post("/api/surveys", newSurvey, function (data) {

                    // Clear current map filters
                    mapControls.activeHobbies.clear();
                    mapControls.activeSocial.clear();

                    // Set hobby filters from survey
                    let hobbies = data.Hobbies.map(h => {
                        return h.id
                    });
                    for (let hobby of hobbies) {
                        mapControls.activeHobbies.add(hobby);
                        const $allHobbies = $(".sidebar-toggle[data-category='hobbies']");
                        $allHobbies.each(function () {
                            if (!mapControls.activeHobbies.has($(this).data("filter-id"))) {
                                $(this).removeClass("active");
                            } else {
                                $(this).addClass("active");
                            }
                        });
                    }

                    // Set social filters from survey
                    let socials = data.Socials.map(s => {
                        return s.id
                    });
                    for (let social of socials) {
                        mapControls.activeSocial.add(social);
                        const $allSocials = $(".sidebar-toggle[data-category='social']");
                        $allSocials.each(function () {
                            if (!mapControls.activeSocial.has($(this).data("filter-id"))) {
                                $(this).removeClass("active");
                            } else {
                                $(this).addClass("active");
                            }
                        });

                    }
                    mapControls.updateMapMarkers();
                    mapControls.updateHeatMap();


                });

            }
        });

    });



// $('.check-label').on('click', (e) => {
//     e.preventDefault();
//     console.log($(this).children())
//     let answer = $('.check-label').find(':checkbox');
//     console.log(answer)
//     // let j = JSON.stringify(answer);
//     // console.log(j);
//     console.log('change');
//     console.log(`${$(this)} changed`)
//     console.log(this.children)
// })

//right side-bar
let checkArr = [];
$('body').on('click', '.check-label', function(e) {
    e.preventDefault();
    let currentValue = $(this).children().attr('value');
    console.log(currentValue);
    setTimeout(function(){ getSelected() }, 500);
 
})
   
function getSelected() {
    checkArr = [];
    checkArr = $(".check-label input:checkbox:checked").map(function() {
        return $(this).val()
    }).get();
    console.log(checkArr);
    return(checkArr);
    sortList(checkArr);
}

function renderNeighborhoods(surveys){
    let keys = Object.keys(surveys); 
    keys.forEach(x => {
        let panel = $('<div class="panel panel-default sortable-panel" data="">');
        let panelHead = $(`<div class="panel-heading panelHead" role="tab" id="${x.replace(/\s+/g, '')}Heading">`);
        let title = $('<h4 class="panel-title">').text(x);
        let panelTable = $(`<table class="table" id="${x.replace(/\s+/g, '')}table">`);
        let tableHead = $(`<thead>`);
        let headRow = $(`<tr id="${x.replace(/\s+/g, '')}HeadRow">`);
        let tableBody = $(`<tbody id="${x.replace(/\s+/g, '')}Body">`)
        let tableRow = $(`<tr id="${x.replace(/\s+/g, '')}Row">`)
        panel.html(panelHead);
        panelHead.html(title);
        panel.append(panelTable);
        panelTable.html(tableHead);
        tableHead.html(headRow);
        panelTable.append(tableBody);
        tableBody.html(tableRow);
        panelHead.css('background-color', '#26a69a')
        tableRow.css('border-top', '1px solid #26a69a')
        $('.filter-section').append(panel);
        renderData(surveys)
        let styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.type = 'text/css';
        styles.href = 'css/app/side-bar-right.css';
        document.getElementsByTagName('head')[0].appendChild(styles);
    })
}

function sortList(checkArr) {
    let section = $('.filter-section');
    let list = $('filter-section').children('.sortable-panel');

    list.detach().sort((a, b) => {
        return $(a).data('sortBy') - $(b).data('sortBy');
    });

    section.append(list);
}


function renderData(surveys) {
    let neighborhoods = Object.keys(surveys);
    neighborhoods.forEach(x => {

        let entries = Object.entries(surveys[x]);
        console.log(`data entries = ${entries}`);
        entries.forEach(y => {
            let keys = y[0];
            let answerValues = y[1][0].answer;
            let countValues = y[1][0].Count;
            let header = $('<th>');
            header.text(keys);
            let td = $('<td>');
            td.text(`${answerValues}: ${countValues}`);
            let targetID = x.replace(/\s+/g, '');
            if($(`#${targetID}HeadRow`).children().length < 8){
                $(`#${targetID}HeadRow`).append(header);
                $(`#${targetID}HeadRow`).closest('.sortable-panel').data('sortBy', countValues);
            }
            if($(`#${targetID}HeadRow`).children().length < 8){
                $(`#${targetID}Row`).append(td);
            }
        })
    })
}

  console.log('main.js loaded')


    // Load aggregated neighborhood information when right side bar button
    // (aka 'hamburger' looking button) is clicked
    $("#hamburger_button").on("click", function (submit) {
        submit.preventDefault();
        $.ajax({
            url: `/api/neighborhoods/`,
            type: "GET",
            success: function (data) {
                renderNeighborhoods(data);
                console.log(data);
                for (item in data) {
                    // Returning neighborhood name and storing it in variable 'neighborhood_name'
                    var neighborhood_name = item;
                    console.log(`Neighborhood: ${neighborhood_name}`)
                    for (subItem in data[item]) {
                        data[item][subItem].forEach((a) => {
                            // Storing each question, answer, and count of those answers (per neighborhood)
                            // to variables 'question', 'answer', and  'count'.
                            // Note that a.Count has a capital 'C' while the variable name has a lower case 'c'
                            var question = a.question;
                            var answer = a.answer;
                            var count = a.Count;
                            console.log(`${question} : ${answer} [${count}]`)
                        });
                    }
                }
            }
        });
    });
});
