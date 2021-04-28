
const turf = require('@turf/turf')
const jsts = require('jsts');

// turf
var poly1 = turf.polygon([[[0,0],[0,5],[5,5],[5,0],[0,0]]]);
var poly2 = turf.polygon([[[1,1],[1,6],[6,6],[6,1],[1,1]]])
console.log('turf运算结果：', turf.booleanOverlap(poly1, poly2))

// jsts
var reader = new jsts.io.WKTReader()
var jstsPoly1 = reader.read('POLYGON ((0 0, 0 5, 5 5, 5 0, 0 0))')
var jstsPoly2= reader.read('POLYGON ((1 1, 1 6, 6 6, 6 1, 1 1))')
console.log('jsts运算结果：',jsts.operation.relate.RelateOp.overlaps(jstsPoly1, jstsPoly2))