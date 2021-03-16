mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaGJhcm90MTk5NSIsImEiOiJja2xiZnpzNm0ybDIwMnZwZTN5YTNicTdxIn0.KFX00mfcRSTdnk9hFCVLaw';

var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-73.98433940235135, 40.75487934025684], // starting position [lng, lat]
  zoom: 9.5
   // starting zoom
});

map.on('style.load', function()
{
  map.addSource('parks', {
  type: 'geojson',
  data: '/data/map.geojson',
  });

  map.addLayer({
      'id': 'biggestparks',
      'type': 'fill',
      'source': 'parks',
      'layout': {},
      'paint': {
        'fill-color': '#f08',
        'fill-opacity': 0.4
      }
    });

    // When a click event occurs on a feature in the biggestparks layer, open a popup at the
  // location of the click, with description HTML from its properties.
  map.on('click', 'biggestparks', function (e) {
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setHTML(e.features[0].properties.name)
  .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'biggestparks', function () {
  map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'biggestparks', function () {
  map.getCanvas().style.cursor = '';
  });
})
