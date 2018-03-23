// var clustering = require('density-clustering');

module.exports = function () {
    // Register global map controls
    global.mapControls = {
        neighborHoodLayer: null,
        heatMap: null,
        markerCluster: null,
        mapMarkers: [],
        visibleMarkers: [],
        updateMapMarkers: updateMapMarkers,
        updateHeatMap: updateHeatMap
    };

    // Add KML neighborhood overlay
    function toggleNeighborhoodOverlay() {
        if (mapControls.neighborHoodLayer === null || mapControls.neighborHoodLayer.getMap() === null) {
            mapControls.neighborHoodLayer = new google.maps.KmlLayer({
                url: 'http://chicagomap.zolk.com/sources/neighborhoods/source.kml',
                preserveViewport: true,
                map: map
            });
        } else {
            mapControls.neighborHoodLayer.setMap(null);
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
        mapControls.visibleMarkers = mapControls.mapMarkers.filter(m => {
            return m.getMap();
        });
    }

    function createHeatMap() {
        // Display heatmap
        let latLng = mapControls.visibleMarkers.map(m => {
            return m.position;
        });
        mapControls.heatMap = new google.maps.visualization.HeatmapLayer({
            data: latLng,
            map: map,
            radius: 30,
        });
    }

    // Update heat map based on visible markers
    function updateHeatMap() {
        if (mapControls.heatMap && mapControls.heatMap.getMap()) {

            let latLng = mapControls.visibleMarkers.map(m => {
                return m.position;
            });
            mapControls.heatMap.setData(latLng);
        }
    }

    // Create marker cluster map
    function createClusterMap(){
        mapControls.markerCluster = new MarkerClusterer(map, mapControls.visibleMarkers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }

    // Remove cluster map and replace with marker dots
    function removeClusterMap() {
        if(mapControls.markerCluster) {
            mapControls.markerCluster.clearMarkers();
            mapControls.visibleMarkers.forEach(m => {
                m.setMap(map);
            });
        }
        $("#your-matches").removeClass("active");
    }

    // Register overlay toggle
    $("#neighborhood-map").on('click', function () {
        $(this).toggleClass("active");
        toggleNeighborhoodOverlay();
    });

    // Register heatmap toggle
    $("#heat-map").on('click', function () {
        if (!mapControls.heatMap) {
            createHeatMap();
        }
        if ($(this).hasClass("active")) {
            mapControls.heatMap.setMap(null);
        } else {
            mapControls.heatMap.setMap(map);
            updateHeatMap();
        }
        $(this).toggleClass("active");

    });

    // Register hobby toggle all
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
                mapControls.activeHobbies.add(hobbyId);
            });
        }
        // Update map and layers
        updateMapMarkers();
        updateHeatMap();
        removeClusterMap();

        $el.toggleClass("active");
    });

    // Register social toggle all
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
        // Update map and layers
        updateMapMarkers();
        updateHeatMap();
        removeClusterMap();

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

        // Update map and layers
        updateMapMarkers();
        updateHeatMap();
        removeClusterMap();

        $(this).toggleClass("active");
    });

    // Your matches toggle
    $("#your-matches").on("click", function () {
        if (!mapControls.markerCluster || !$(this).hasClass("active")) {
            createClusterMap();
            $(this).addClass("active");
        } else {
            removeClusterMap()
        }

    });

    // Clear map and reset all layers
    $("#clear-map").on("click", function () {
        mapControls.visibleMarkers.forEach(m => {
            m.setMap(null);
        });
        mapControls.visibleMarkers = [];
        mapControls.activeHobbies.clear();
        mapControls.activeSocial.clear();
        $(".sidebar-toggle[data-category='social']").removeClass("active");
        $(".sidebar-toggle[data-category='hobbies']").removeClass("active");
        $("#social-all-toggle").removeClass("active");
        $("#hobbies-all-toggle").removeClass("active");
        $("#your-matches").removeClass("active");
        if (mapControls.heatMap) {
            mapControls.heatMap.setMap(null);
        }
        if (mapControls.neighborHoodLayer) {
            mapControls.neighborHoodLayer.setMap(null);
        }
        if(mapControls.markerCluster) {
            mapControls.markerCluster.clearMarkers();
        }

    });

};