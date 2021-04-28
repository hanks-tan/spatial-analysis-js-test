
const turf = require('@turf/turf')
const jsts = require('jsts');

// turf
const point = turf.point([-90.548630, 14.616599]);
const buffered = turf.buffer(point, 500, {units: 'miles'});
console.log('turf运算结果：', buffered)

// jsts
const reader = new jsts.io.WKTReader()
const jstsPoint = reader.read('POINT (-90.548630 14.616599)')
const jstsBuffer = jsts.operation.buffer.BufferOp.bufferOp(jstsPoint, 500)
console.log('jsts运算结果：', jstsBuffer)