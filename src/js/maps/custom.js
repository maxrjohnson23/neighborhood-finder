const mapOverlay = require("./mapOverlay");

module.exports = function () {

    let map = new google.maps.Map(document.getElementById('google-fs-map'), {
        center: new google.maps.LatLng(41.88105093780886, -87.62773873898391),
        zoom: 11,
    });
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

    window.map = map;


    $("#neighborhood-overlay").on('click', function () {
        mapOverlay.toggleNeighborhoodOverlay(window.map);
    });

    window.mapControls = {
        neighborHoodLayer: null
    };
}
