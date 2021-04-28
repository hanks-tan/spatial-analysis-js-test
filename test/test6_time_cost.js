var jsts = require('jsts')

var i = 0
var count = 1000000

var time1 = new Date().getTime()
var reader = new jsts.io.WKTReader()
var jstsPolygon = reader.read('POLYGON((1 1, 35 1, 35 84, 1 84, 1 1))')
while (i < count) {
  var x = Math.random() * 100
  var y = Math.random() * 100
  var p = reader.read(`POINT(${x} ${y})`)
  jsts.operation.relate.RelateOp.contains(jstsPolygon, p)
  i++
}
var time2 = new Date().getTime()
console.log(`jsts test done!, ${time2 - time1}ms`)