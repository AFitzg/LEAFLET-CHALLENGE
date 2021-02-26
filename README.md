Leaflet Homework - Visualizing Data with Leaflet
Goal is to visualize a USGS earthquake. 
Pulled GeoJson data from the USGS website for earthquakes over the last 7 days.

To visualize the data, a map needed to be created using Leaflet that showd splots of all of the earthquakes from the last 7 days data set based on their longitude and latitude.

Created map layers using leaflet to show earthquake layer on dark and street maps. Earthquake data was shown via markers. On click, markers display a brief overview of key earthquake details. Markers reflected the magnitude of the earthquake via the size of the radius, higher magnitudes had a larger radius and lower magnitudes had a smaller radius. The depth was reflected via marker color intensity. The deeper the earthquake the darker the marker.

A legend was created to provide context for the map and show earthquake details shown via the marker size and color.


HW Instructions:
Get your data set

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.



Import & Visualize the Data
Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.


Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.


HINT the depth of the earth can be found as the third coordinate for each earthquake.


Include popups that provide additional information about the earthquake when a marker is clicked.


Create a legend that will provide context for your map data.


Your visualization should look something like the map above.




