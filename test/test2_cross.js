
const turf = require('@turf/turf')
const jsts = require('jsts');

// turf
const line1 = turf.lineString([[-2, 2], [4, 2]]);
const line2 = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
console.log('turf运算结果：', turf.booleanCrosses(line1, line2))

// jsts
const reader = new jsts.io.WKTReader()
const jstsLine1 = reader.read('LINESTRING (-2 2, 4 2)')
const jstsLine2 = reader.read('LINESTRING (1 1, 1 2, 1 3, 1 4)')
console.log('jsts运算结果：',jsts.operation.relate.RelateOp.crosses(jstsLine1, jstsLine2))