//var data = require("./data/data.json");


module.exports = function () {

    // Fetch markers from DB
    console.log('Fetching markers');

    // Generate seed data
    // data.forEach((a) => {
    //     let latLng = new google.maps.LatLng(a.lat, a.lng);
    //     var marker = new google.maps.Marker({
    //         map: map,
    //         position: latLng,
    //         icon: '/images/markers/user-01.png'
    //     });
    // });

    $.ajax({
        url: `/api/surveys/`,
        type: "GET",
        success: function (data) {
            console.log(data);

            // Map each marker by lat/long
            data.forEach((a) => {
                let latLng = new google.maps.LatLng(a.geocodeLat, a.geocodeLng);
                let marker = new google.maps.Marker({
                    map: map,
                    position: latLng,
                    icon: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png"
                });
                // Store data points in mapControls for access
                mapControls.mapMarkers.push(marker);
                mapControls.mapLatLng.push(latLng);

            });

        }
    });
};