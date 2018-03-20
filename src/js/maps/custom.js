const mapOverlay = require("./mapOverlay");
const mapMarkers = require("./mapMarkers");

module.exports = function () {

    let map = new google.maps.Map(document.getElementById('google-fs-map'), {
        center: new google.maps.LatLng(41.88105093780886, -87.62773873898391),
        zoom: 11,
    });
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

    // Set global reference
    window.map = map;

    // Initialize overlay and markers
    mapOverlay();
    mapMarkers();

    google.maps.event.addListener(map, "click", function (event) {
        // get lat/lon of click
        var clickLat = event.latLng.lat();
        var clickLng = event.latLng.lng();

        console.log(`${clickLat}, ${clickLng}`);
        // var marker = new google.maps.Marker({
        //     position: new google.maps.LatLng(clickLat,clickLng),
        //     map: map
        // });
    });

};
