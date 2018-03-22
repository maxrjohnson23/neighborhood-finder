const mapOverlay = require("./mapOverlay");
const mapMarkers = require("./mapMarkers");

module.exports = function () {

    // Create Google map with global reference
    map = new google.maps.Map(document.getElementById('google-fs-map'), {
        // Chicago coordinates
        center: new google.maps.LatLng(41.88105093780886, -87.62773873898391),
        zoom: 11,
        mapTypeId: "google.maps.MapTypeId.ROADMAP"
    });

    // Initialize overlay and markers
    mapOverlay();
    mapMarkers();

};
