// store query URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// perform GET request to the queryURL
d3.json(queryUrl, function(data) {
    console.log(data.features);
    createFeatures(data.features);
});

function createFeatures(earthquakeinfo) {
    
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + 
        "</h3><hr><p>" + new Date(feature.properties.time) + "<hr><p>" + "Magnitude: " + feature.properties.mag + "<hr><p>" + "Depth(km): " + feature.geometry.coordinates[2] + "</p>");
    }

    function earthquakeradius(magnitude) {
        return magnitude * 3;
    };

    // function earthquakedepth(deepness) {
    //     return deepness *1;
    // }

    function depthcolor(earthquakedepth) {
        if (earthquakedepth > 90) {
            return '#581845'
        } else if (earthquakedepth > 70) {
            return '#900C3F'
        } else if (earthquakedepth > 50) {
            return '#C70039'
        } else if (earthquakedepth > 30) {
            return '#FF5733'
        } else if (earthquakedepth > 10) {
            return '#FFC300'
        } else {
            return '#DAF7A6'
        }
    };


    var earthquakes = L.geoJSON(earthquakeinfo, {
        onEachFeature: onEachFeature,
        pointToLayer: function(_feature, latlng) {
            //console.log(_feature.geometry.coordinates[2]);
            return L.circleMarker(latlng, {
                radius: earthquakeradius(_feature.properties.mag),
                color: depthcolor(_feature.geometry.coordinates[2]),
                fillOpacity: false
                })   

            
        }
    });

    createMap(earthquakes);

}


function createMap(earthquakes) {

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      });
    
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
      });

    var baseMaps ={
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend = L.control({position: "bottomright"});
    
    legend.onAdd = function(map) {
        
        var div = L.DomUtil.create("div", "info legend"),
        earthquakedepthh = [-10, 10 ,30, 50, 70, 90];
        

        function depthcolor(earthquakedepth) {
            if (earthquakedepth > 90) {
                return '#581845'
            } else if (earthquakedepth > 70) {
                return '#900C3F'
            } else if (earthquakedepth > 50) {
                return '#C70039'
            } else if (earthquakedepth > 30) {
                return '#FF5733'
            } else if (earthquakedepth > 10) {
                return '#FFC300'
            } else {
                return '#DAF7A6'
            }
        };

         var legendInfo = "<h1>Depth(km)</h1>" ;
         div.innerHTML = legendInfo;
        
        // function depthcolor(earthquakedepth) {
        //     if (earthquakedepth > 90) {
        //         return 'red'
        //     } else if (earthquakedepth > 70) {
        //         return 'orange'
        //     } else if (earthquakedepth > 50) {
        //         return 'yellow'
        //     } else if (earthquakedepth > 30) {
        //         return 'blue'
        //     } else if (earthquakedepth > 10) {
        //         return 'purple'
        //     } else {
        //         return 'green'
        //     }
        // };
        for (var i = 0; i < earthquakedepthh.length; i++) {
            div.innerHTML += 
            '<i style="background:' + depthcolor(earthquakedepthh[i] + 1) + '">&nbsp;&nbsp;&nbsp;</i>' +
            earthquakedepthh[i] + (earthquakedepthh[i + 1] ? '&ndash;' + earthquakedepthh[i + 1] + '<br>' : '+'); 
        }
        return div;
    };
    legend.addTo(myMap);
}