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

    function createHeatMap() {
        // Display heatmap
        mapControls.heatMap = new google.maps.visualization.HeatmapLayer({
            data: mapControls.mapLatLng,
            map: map,
            radius: 30,
        });
    }

    // Register global map controls
    window.mapControls = {
        neighborHoodLayer: null,
        heatMap: null,
        mapLatLng: [],
        mapMarkers: []
    };

    // Register overlay toggle button
    $("#neighborhood-overlay").on('click', function () {
        toggleNeighborhoodOverlay(window.map);
    });

    // Register heatmap toggle button
    $("#heatmap-overlay").on('click', function () {
        if (!mapControls.heatMap) {
            createHeatMap();
        } else {
            mapControls.heatMap.setMap(mapControls.heatMap.getMap() ? null : map);
        }

    });

};