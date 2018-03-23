// var clustering = require('density-clustering');

module.exports = function () {
    // Register global map controls
    global.mapControls = {
        neighborHoodLayer: null,
        heatMap: null,
        mapLatLng: [],
        mapMarkers: [],
        markerCluster: null,
        updateMapMarkers: updateMapMarkers,
        updateHeatMap: updateHeatMap
    };

    function toggleNeighborhoodOverlay(map) {
        if (global.mapControls.neighborHoodLayer === null || global.mapControls.neighborHoodLayer.getMap() === null) {
            let neighborhoodLayer = new google.maps.KmlLayer({
                url: 'http://chicagomap.zolk.com/sources/neighborhoods/source.kml',
                preserveViewport: true,
                map: map
            });
            global.mapControls.neighborHoodLayer = neighborhoodLayer;
        } else {
            global.mapControls.neighborHoodLayer.setMap(null);
        }
    }

    function updateMapMarkers() {
        mapControls.mapMarkers.forEach(m => {
            let shouldDisplay = false;

            for (let hobby of m.hobbies) {
                if (mapControls.activeHobbies.has(hobby)) {
                    shouldDisplay = true;
                }
            }
            for (let social of m.social) {
                if (mapControls.activeSocial.has(social)) {
                    shouldDisplay = true;
                }
            }
            m.setMap((shouldDisplay) ? map : null);
        });
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
        if (mapControls.heatMap && mapControls.heatMap.getMap()) {

            mapControls.mapLatLng = mapControls.mapMarkers.filter(m => {
                return m.getMap();
            }).map(m => {
                return m.position;
            });
            mapControls.heatMap.setData(mapControls.mapLatLng);
        }
    }


    // Register overlay toggle
    $("#neighborhood-map").on('click', function () {
        $(this).toggleClass("active");
        toggleNeighborhoodOverlay(global.map);
    });

    // Register heatmap toggle
    $("#heat-map").on('click', function () {
        if (!mapControls.heatMap) {
            createHeatMap();
        }
        if ($(this).hasClass("active")) {
            mapControls.heatMap.setMap(null);
        } else {
            mapControls.heatMap.setData(mapControls.mapLatLng);
            mapControls.heatMap.setMap(map);
        }
        $(this).toggleClass("active");

    });

    $("#hobbies-all-toggle").on("click", function () {
        const $el = $(this);

        const $allHobbies = $(".sidebar-toggle[data-category='hobbies']");

        if ($el.hasClass("active")) {
            $allHobbies.removeClass("active");
            mapControls.activeHobbies.clear();
        } else {
            $allHobbies.addClass("active");
            $allHobbies.each(function () {
                let hobbyId = $(this).data("filter-id");
                mapControls.activeSocial.add(hobbyId);
            });
        }
        updateMapMarkers();
        updateHeatMap();
        $el.toggleClass("active");
    });

    $("#social-all-toggle").on("click", function () {
        const $el = $(this);

        const $allSocial = $(".sidebar-toggle[data-category='social']");

        if ($el.hasClass("active")) {
            $allSocial.removeClass("active");
            mapControls.activeSocial.clear();
        } else {
            $allSocial.addClass("active");
            $allSocial.each(function () {
                let socialId = $(this).data("filter-id");
                mapControls.activeSocial.add(socialId);
            });
        }
        updateMapMarkers();
        updateHeatMap();
        $el.toggleClass("active");
    });

    // Register marker filters
    $(".sidebar-toggle").on('click', function () {

        const $el = $(this);
        // Get category and id to filter the map markers
        const isDelete = $el.hasClass("active");
        const filterId = $el.data("filter-id");
        const category = $el.data("category");

        if (category === "hobbies") {
            if (isDelete) {
                mapControls.activeHobbies.delete(filterId);
            } else {
                mapControls.activeHobbies.add(filterId);
            }
        }
        if (category === "social") {
            if (isDelete) {
                mapControls.activeSocial.delete(filterId);
            } else {
                mapControls.activeSocial.add(filterId);
            }
        }

        // Refresh map overlays
        updateMapMarkers();
        updateHeatMap();


        $(this).toggleClass("active");
    });

    $("#find-now").on("click", function () {

        if(mapControls.markerCluster !== null && mapControls.markerCluster.getMarkers().length === 0) {
            mapControls.markerCluster.clearMarkers();
            let visibleMarkers = mapControls.mapMarkers.filter(m => {
                return m.getMap();
            });
            map.data = visibleMarkers;
        } else {
            let visibleMarkers = mapControls.mapMarkers.filter(m => {
                return m.getMap();
            });
            mapControls.markerCluster = new MarkerClusterer(map, visibleMarkers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            mapControls.markerCluster.setCalculator(function (markers, numStyles) {
                var index = 0;
                var count = markers.length;
                var dv = count;
                while (dv !== 0) {
                    dv = parseInt(dv / 10, 10);
                    index++;
                }

                index = Math.min(index, numStyles);
                return {
                    text: ((count/visibleMarkers.length)*1000).toFixed(0),
                    index: index
                };
            });
        }

    });

};