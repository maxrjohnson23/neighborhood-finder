// var clustering = require('density-clustering');

module.exports = function () {
    // Register global map controls
    global.mapControls = {
        neighborHoodLayer: null,
        heatMap: null,
        mapLatLng: [],
        mapMarkers: []
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

    // function centerPoint(markers) {
    //     let newmarkers = markers.filter(m => {
    //         return m.getMap();
    //     }).map(m => {
    //         return m.position;
    //     });
    //     console.log(newmarkers);
    //     var dataset = [];
    //
    //     for (var i = 0; i < newmarkers.length; i++) {
    //         dataset.push([newmarkers[i].lat(), newmarkers[i].lng()]);
    //     }
    //
    //     var dbscan = new clustering.DBSCAN();
    //     var clusters = dbscan.run(dataset, 1, 500);
    //
    //     if (clusters.length > 0) {
    //
    //         /* Find the biggest cluster */
    //         var biggestCluster = clusters[0];
    //
    //         for (i = 1; i < clusters.length; i++) {
    //
    //             if (cluster[i].length > biggestCluster.length) {
    //                 biggestCluster = cluster[i];
    //             }
    //         }
    //
    //         /* The output of the library contains the indexes of the points in the cluster, not the coordinates, so we need to get the point from the dataset */
    //         var clusterPoints = [];
    //         var sumx = 0;
    //         var sumy = 0;
    //
    //         for (i = 0; i < biggestCluster.length; i++) {
    //             var point = dataset[biggestCluster[i]];
    //             clusterPoints.push(point);
    //
    //             /* It's also a good opportunity to cumulate x and y so we can get the average */
    //             sumx += point[0];
    //             sumy += point[1];
    //         }
    //
    //         console.log('Cluster:', clusterPoints);
    //         console.log('Center:', sumx / clusterPoints.length, sumy / clusterPoints.length);
    //
    //         let ll = new google.maps.LatLng(sumx / clusterPoints.length, sumy / clusterPoints.length);
    //         let marker = new google.maps.Marker({
    //             map: map,
    //             position: ll
    //         });
    //     }
    //
    // }
    //
    // global.center = centerPoint;

};