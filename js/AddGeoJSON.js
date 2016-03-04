// This script demonstrates some simple things one can do with leaflet.js

var southWest = L.latLng(40.397720365280925, -74.28390722162672),
    northEast = L.latLng( 40.956362563308716, -73.62159642910947),
    bounds = L.latLngBounds(southWest,northEast);

// var map = L.map('map').setView([40.71,-73.93], 11);

var map = L.map('map', {
    maxBounds: bounds,
    maxZoom: 14,
    minZoom: 11
});

map.fitBounds(bounds);

// set a tile layer to be CartoDB tiles 
// var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
//   attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
// });

// add these tiles to our map
// map.addLayer(CartoDBTiles);
var hillshade = "raster/hillshade_mask_test.jpg";

L.imageOverlay(hillshade, bounds).addTo(map);

// instantiate GeoJSON layers
var estuaryGeoJSON
var trailsGeoJSON;
var campsGeoJSON;
var villagesGeoJSON;
var welikia_mslGeoJSON;

// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
// $.getJSON( "geojson/estuary.geojson", function( data ) {
//     var estuary = data;

//     estuaryStyle = {
//         "weight": 0,
//         "fillColor": "#538cc6",
//         "opacity": 0.5
//     };

//     estuaryGeoJSON = L.geoJson(estuary, {
//     style: estuaryStyle  
//     }).addTo(map);
// });

// $.getJSON( "geojson/welikia_msl.geojson", function( data ) {
//     var welikia_msl = data;

//     welikia_mslStyle = {
//         "weight": 0,
//         "fillColor": "#627722",
//         "opacity": 0.5
//     };

//     welikia_mslGeoJSON = L.geoJson(welikia_msl, {
//     style: welikia_mslStyle  
//     }).addTo(map);
// });
//     console.log('adding landcover.geojson')
//     // ensure jQuery has pulled all data out of the geojson file
//     var landcover = data;
// $.getJSON( "geojson/landcover.geojson", function( data ) {
//     console.log('adding landcover.geojson')
//     // ensure jQuery has pulled all data out of the geojson file
//     var landcover = data;

//     var landcoverStyle = function (feature){
//         console.log(feature.properties.Type_1)
//         var type = feature.properties.Type_1;
//         fillColor = landcoverfillColor(type);
//         console.log(fillColor)

//         var style = {
//             weight: 0,
//             fillOpacity: .7,
//             fillColor: fillColor
//         };
//         return style
//     }

//     landcoverGeoJSON = L.geoJson(landcover, {
//     style: landcoverStyle  
//     }).addTo(map);

// });

// let's add the subway lines
$.getJSON( "geojson/camps.geojson", function( data ) {
    console.log('adding camps geojson')
    // ensure jQuery has pulled all data out of the geojson file
    var camps = data;
    
    var campsPointToLayer = function (feature, latlng){
        // console.log(latlng)
        var campsMarker = L.circle(latlng, 100, {
            stroke: false,
            fillColor: 'red',
            fillOpacity: 1
        });
        return campsMarker
    }

    campsGeoJSON = L.geoJson(camps, {
        pointToLayer: campsPointToLayer
    }).addTo(map);

});

// let's add neighborhood data
$.getJSON( "geojson/trails.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var trails = data;
    // draw the dataset on the map

    trailStyle = {
        "color": "red",
        "weight": 2,
        "opacity": 1
    };

    trailsGeoJSON = L.geoJson(trails, {
        style: trailStyle
    }).addTo(map);
});

// let's add pawn shops data
$.getJSON( "geojson/villages.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var villages = data;
    // draw the dataset on the map
    var villagesPointToLayer = function (feature, latlng){
        // console.log(latlng)
        var villageMarker = L.circle(latlng, 200, {
            stroke: false,
            fillColor: 'red',
            fillOpacity: 1
        });
        return villageMarker
    }

    campsGeoJSON = L.geoJson(villages, {
        pointToLayer: villagesPointToLayer
    }).addTo(map);
});

// function landcoverfillColor(type) {
//     health_colors = ['76A899','74C29F','798074','989988','DBDEAD','BDC269', '45731D']
//     return type == 'High Salt Marsh'   ? health_colors[0] :
//            type == 'Low Salt Marsh'    ? health_colors[1] :
//            type == 'Marine Rocks'      ? health_colors[2] :
//            type == 'Rocky Intertidal'  ? health_colors[3] :
//            type == 'Sand Dunes'        ? health_colors[4] :
//            type == 'Sandy Beach'       ? health_colors[5] :
//             health_colors[6];
// }



