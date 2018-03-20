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

};
