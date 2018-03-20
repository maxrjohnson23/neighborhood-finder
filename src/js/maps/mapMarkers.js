module.exports = function () {

    // Fetch markers from DB
    console.log('Fetching markers');
    $.ajax({
        url: `/api/surveys/`,
        type: "GET",
        success: function (data) {
            console.log(data);

            // Map each marker by lat/long
            data.forEach((a) => {
                let latLng = new google.maps.LatLng(a.geocodeLat, a.geocodeLng);
                var marker = new google.maps.Marker({
                    map: map,
                    position: latLng,
                    icon: '/images/markers/user-01.png'
                });
            });
        }
    });
};