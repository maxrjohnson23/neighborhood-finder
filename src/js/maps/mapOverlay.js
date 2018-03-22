module.exports = function () {
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

    // Register overlay toggle
    $("#neighborhood-map").on('click', function () {
        $(this).toggleClass("active");
        toggleNeighborhoodOverlay(window.map);
    });

    // Register heatmap toggle
    $("#heat-map").on('click', function () {
        console.log('TEST');
        $(this).toggleClass("active");
        if (!mapControls.heatMap) {
            createHeatMap();
        } else {
            mapControls.heatMap.setMap(mapControls.heatMap.getMap() ? null : map);
        }

    });

    // Register marker filters
    $(".sidebar-toggle").on('click', function () {

        let filterId = $(this).data("filter-id");
        let category = $(this).data("category");

        if ($(this).hasClass("active")) {
            mapControls.mapMarkers.forEach(m => {

                if (m[category].includes(filterId)) {
                    m.setMap(null);
                }
            });
        } else {
            mapControls.mapMarkers.forEach(m => {
                if (m[category].includes(filterId)) {
                    m.setMap(map);
                }
            });
        }
        $(this).toggleClass("active");
    });

};