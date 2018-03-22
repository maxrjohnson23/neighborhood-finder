module.exports = function () {
    // Register global map controls
    mapControls = {
        neighborHoodLayer: null,
        heatMap: null,
        mapLatLng: [],
        mapMarkers: []
    };

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

    function updateHeatMap() {
        mapControls.mapLatLng = mapControls.mapMarkers.filter(m => {
            return m.getMap();
        }).map(m => {
            return m.position;
        });
        mapControls.heatMap.setData(mapControls.mapLatLng);
    }


    // Register overlay toggle
    $("#neighborhood-map").on('click', function () {
        $(this).toggleClass("active");
        toggleNeighborhoodOverlay(window.map);
    });

    // Register heatmap toggle
    $("#heat-map").on('click', function () {
        if(!mapControls.heatMap) {
            createHeatMap();
        }
        if($(this).hasClass("active")){
            mapControls.heatMap.setMap(null);
        } else {
            mapControls.heatMap.setData(mapControls.mapLatLng);
            mapControls.heatMap.setMap(map);
        }
        $(this).toggleClass("active");


    });

    // Register marker filters
    $(".sidebar-toggle").on('click', function () {

        // Get category and id to filter the map markers
        let filterId = $(this).data("filter-id");
        let category = $(this).data("category");

        if ($(this).hasClass("active")) {
            mapControls.mapMarkers.forEach(m => {

                // Remove markers from map
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

        // If heatmap overlay is on
        if(mapControls.heatMap && mapControls.heatMap.getMap()) {
            updateHeatMap();
        }

        $(this).toggleClass("active");
    });

};