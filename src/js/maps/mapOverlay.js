module.exports = function() {
    function toggleNeighborhoodOverlay(map) {
        if (window.mapControls.neighborHoodLayer === null || window.mapControls.neighborHoodLayer.getMap() === null) {
            let neighborhoodLayer = new google.maps.KmlLayer({
                url: 'http://chicagomap.zolk.com/sources/neighborhoods/source.kml',
                preserveViewport: true,
                map: map
            });
            window.mapControls.neighborHoodLayer = neighborhoodLayer;
        } else {
            window.mapControls.neighborHoodLayer.setMap(null);
        }
    }

    // Register global map controls
    window.mapControls = {
        neighborHoodLayer: null
    };

    // Register overlay toggle button
    $("#neighborhood-overlay").on('click', function () {
        toggleNeighborhoodOverlay(window.map);
    });
};