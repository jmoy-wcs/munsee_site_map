// This script demonstrates some simple things one can do with leaflet.js

var southWest = L.latLng(40.397720365280925, -74.28390722162672),
    northEast = L.latLng( 40.956362563308716, -73.62159642910947),
    bounds = L.latLngBounds(southWest,northEast);

// var map = L.map('map').setView([40.71,-73.93], 11);

var map = L.map('map', {
    maxBounds: bounds,
    maxZoom: 14,
    minZoom: 10.5
});

map.fitBounds(bounds);

var hillshade = "raster/hillshade_02.jpg";

L.imageOverlay(hillshade, bounds).addTo(map);

// instantiate GeoJSON layers
var trailsGeoJSON;
var campsGeoJSON;
var villagesGeoJSON;


// Add camps
$.getJSON( "geojson/camps.geojson", function( data ) {
    console.log('adding camps geojson')
    // ensure jQuery has pulled all data out of the geojson file
    var camps = data;
    
    var campsPointToLayer = function (feature, latlng){
        // console.log(latlng)
        var campsMarker = L.circle(latlng, 150, {
            stroke: false,
            fillColor: 'red',
            fillOpacity: .7
        });
        return campsMarker
    }

    // function that binds popup data to camps
    var campClick = function (feature, layer) {
        layer.bindPopup(feature.properties.Name);
    }

    campsGeoJSON = L.geoJson(camps, {
        pointToLayer: campsPointToLayer,
        onEachFeature: campClick
    }).addTo(map);

});

// add trails
$.getJSON( "geojson/trails.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var trails = data;
    // draw the dataset on the map

    trailStyle = {
        "color": "red",
        "weight": 2,
        "opacity": .7
    };

    var trailClick = function (feature, layer) {
        layer.bindPopup(feature.properties.Name);
    }


    trailsGeoJSON = L.geoJson(trails, {
        style: trailStyle,
        onEachFeature: trailClick
    }).addTo(map);
});

// add villages
$.getJSON( "geojson/villages.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var villages = data;
    // draw the dataset on the map
    var villagesPointToLayer = function (feature, latlng){
        // console.log(latlng)
        var villageMarker = L.circle(latlng, 150, {
            stroke: false,
            fillColor: 'red',
            fillOpacity: .7
        });
        return villageMarker
    }

    var villageClick = function (feature, layer) {
            layer.bindPopup(feature.properties.Name);
        }   
    

    campsGeoJSON = L.geoJson(villages, {
        pointToLayer: villagesPointToLayer,
        onEachFeature: villageClick
    }).addTo(map);
});

