module.exports = function () {

    // Fetch markers from DB
    $.ajax({
        url: `/api/surveys/`,
        type: "GET",
        success: function (data) {
            console.log(data);
            mapControls.activeHobbies = new Set();
            mapControls.activeSocial = new Set();

            // Map each marker by lat/long
            data.forEach((a) => {
                // Store active hobbies and social on the map filter
                let hobbies = a.Hobbies.map(h => {
                    mapControls.activeHobbies.add(h.id);
                    return h.id;
                });
                let social = a.Socials.map(s => {
                    mapControls.activeSocial.add(s.id);
                    return s.id;
                });

                // Store hobby and social array on each marker
                let latLng = new google.maps.LatLng(a.geocodeLat, a.geocodeLng);
                let marker = new google.maps.Marker({
                    map: map,
                    position: latLng,
                    hobbies: hobbies,
                    social: social,
                    icon: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png"
                });

                // Store data points in mapControls for map filtering
                mapControls.mapMarkers.push(marker);
                mapControls.mapLatLng.push(latLng);

            });
        }
    });
};