//var data = require("./data/data.json");


module.exports = function () {

    // Fetch markers from DB
    $.ajax({
        url: `/api/surveys/`,
        type: "GET",
        success: function (data) {
            console.log(data);

            // Map each marker by lat/long
            data.forEach((a) => {
                // Store hobby and social array on each marker
                let hobbies = a.Hobbies.map(h => h.id);
                let social = a.Socials.map(s => s.id);
                let latLng = new google.maps.LatLng(a.geocodeLat, a.geocodeLng);
                let marker = new google.maps.Marker({
                    map: map,
                    position: latLng,
                    hobbies: hobbies,
                    social: social,
                    icon: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png"
                });
                // Store data points in mapControls for global access
                mapControls.mapMarkers.push(marker);
                mapControls.mapLatLng.push(latLng);

            });
        }
    });
};