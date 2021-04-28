
const turf = require('@turf/turf')
const jsts = require('jsts');

// turf
const line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
const point = turf.point([1, 2]);
console.log('turf运算结果：', turf.booleanContains(line, point))

// jsts
const reader = new jsts.io.WKTReader()
const jstsLine = reader.read('LINESTRING (1 1, 1 2, 1 3, 1 4)')
const jstsPoint = reader.read('POINT (1 2)')
console.log('jsts运算结果：', jsts.operation.relate.RelateOp.contains(jstsLine, jstsPoint))