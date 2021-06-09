var parser = new jsts.io.OL3Parser();
parser.inject(
  ol.geom.Point,
  ol.geom.LineString,
  ol.geom.LinearRing,
  ol.geom.Polygon,
  ol.geom.MultiPoint,
  ol.geom.MultiLineString,
  ol.geom.MultiPolygon
);

var source = new ol.source.Vector();
fetch('./data/roads-seoul.geojson')
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    var format = new ol.format.GeoJSON();
    var features = format.readFeatures(json, {
      featureProjection: 'EPSG:3857',
    });

    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      // convert the OpenLayers geometry to a JSTS geometry
      var jstsGeom = parser.read(feature.getGeometry());

      // create a buffer of 40 meters around each line
      var buffered = jstsGeom.buffer(40);

      // convert back from JSTS and replace the geometry on the feature
      feature.setGeometry(parser.write(buffered));
    }

    source.addFeatures(features);
  });
var vectorLayer = new ol.layer.Vector({
  source: source,
});

var rasterLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

var map = new ol.Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new ol.View({
    center: ol.proj.fromLonLat([126.979293, 37.528787]),
    zoom: 15,
  }),
});

var wktReader = new jsts.io.WKTReader()
var jstsLine = wktReader.read('LINESTRING (1 1, 1 2, 1 3, 1 4)')
var olLine = parser.write(jstsLine)
console.log(olLine.getCoordinates()) 

var olPoint = new ol.geom.Point([1,1])
var jstsPoint = parser.read(olPoint)
console.log(jstsPoint.getCoordinate())